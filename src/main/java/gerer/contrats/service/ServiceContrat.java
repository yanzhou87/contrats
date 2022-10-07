package gerer.contrats.service;

import gerer.contrats.forms.ContratDTO;
import gerer.contrats.model.Contrat;
import gerer.contrats.model.Utilisateur;
import gerer.contrats.repository.ContratRepository;
import gerer.contrats.repository.UtilisateurRepository;
import org.springframework.http.converter.json.GsonBuilderUtils;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class ServiceContrat {
    private ContratRepository contratRepository;
    private UtilisateurRepository utilisateurRepository;

    public ServiceContrat(ContratRepository contratRepository, UtilisateurRepository utilisateurRepository) {
        this.contratRepository = contratRepository;
        this.utilisateurRepository = utilisateurRepository;
    }

    public Contrat saveContrat(Contrat contrat) {
        return  contratRepository.save(contrat);
    }

    public List<ContratDTO> getAllContrats(){
        List<Contrat> contrats = contratRepository.findAll();
        List<ContratDTO> contratDTOs = new ArrayList<>();
        contrats.sort(Comparator.comparing(Contrat::getDateFin).reversed());
        System.out.println(contrats);
        for(Contrat c : contrats){
            ContratDTO contratDTO = new ContratDTO(c.getId(),c.getNom(),c.getDateDebut().toString(),
                    c.getDateFin().toString(),c.getNomClient(),c.getMontant(),c.getModeDuPaiement());
            contratDTOs.add(contratDTO);
        }
        System.out.println("------" +contratDTOs);
        return contratDTOs;
    }

    public List<ContratDTO> getContratsParNomUtilisateur(String nom){
        System.out.println("getContratsParNomUtilisateur : " + nom);

        List<ContratDTO> contrats = getAllContrats();
        List<ContratDTO> contratDTOs = new ArrayList<>();
        for(ContratDTO contratDTO : contrats){
            if (contratDTO.getNom().equals(nom)){
                contratDTOs.add(contratDTO);
            }
        }

        contratDTOs.sort(Comparator.comparing(ContratDTO::getId));
        System.out.println("fin get :" + contratDTOs);
        return contratDTOs;
    }
    public List<ContratDTO> getContratsParNomUtilisateurEtNomClient(String nom, String nomClient) {
        List<ContratDTO> listResultat = new ArrayList<>();
        List<Contrat> contratList = contratRepository.findContratsParNomClient(nom, nomClient);
        for(Contrat c : contratList){
            ContratDTO contratDTO = new ContratDTO(c.getId(),c.getNom(),c.getDateDebut().toString(),
                    c.getDateFin().toString(),c.getNomClient(),c.getMontant(),c.getModeDuPaiement());
            listResultat.add(contratDTO);
        }
        return listResultat;
    }
    public ContratDTO getContratParId(long id) {
        Contrat contrat =  contratRepository.findById(id).get();
        ContratDTO contratDTO = new ContratDTO(contrat.getId(),contrat.getNom(),contrat.getDateDebut().toString(),
                contrat.getDateFin().toString(), contrat.getNomClient(), contrat.getMontant(),contrat.getModeDuPaiement());
        return contratDTO;
    }

    public List<ContratDTO> getContratsExpirants(String nomUtilisateur) {

        List<Contrat> contrats = contratRepository.findAll();
        List<Contrat> contratsExpirants = contrats.stream().filter((contrat)-> Period.between(LocalDate.now(), contrat.getDateFin()).getDays() <= 3).toList();
        List<ContratDTO> contratDTOS = new ArrayList<>();
    //    contratsExpirants.stream().forEach((contrat)-> contratDTOS.add(new ContratDTO(contrat.getId(),contrat.getNom(),
     //           contrat.getDateDebut().toString(),contrat.getDateFin().toString(),contrat.getNomClient(),contrat.getMontant(),contrat.getModeDuPaiement(),
        //        contrat.isRappelDePaiement())));

        for(Contrat contrat : contratsExpirants){
            if(contrat.getNom().equals(nomUtilisateur)){
                ContratDTO contratDTO = new ContratDTO(contrat.getId(),contrat.getNom(),
                        contrat.getDateDebut().toString(),contrat.getDateFin().toString(),contrat.getNomClient(),contrat.getMontant(),contrat.getModeDuPaiement());
                contratDTOS.add(contratDTO);
            }
        }
        return contratDTOS;
    }

    public List<ContratDTO> getContratsExpirantsParNomUtilisateurEtNomClient(String nom, String nomClient) {
        List<ContratDTO> listContratsExpirants = getContratsExpirants(nom);
        List<ContratDTO> listResultat = new ArrayList<>();
        for(ContratDTO c : listContratsExpirants){
            if(c.getNomClient().contains(nomClient)){
                listResultat.add(c);
            }
        }
        return listResultat;
    }

    public ContratDTO saveContratDTO(ContratDTO contratDTO) {
        Utilisateur utilisateur = utilisateurRepository.findUtilisateurByNom(contratDTO.getNom()).get();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-d");
        String[] dateD = contratDTO.getDateDebut().split("T");
        String[] dateF = contratDTO.getDateFin().split("T");
        LocalDate dateDebut = LocalDate.parse(dateD[0], formatter);
        LocalDate dateFin = LocalDate.parse(dateF[0], formatter);

        Contrat contrat = new Contrat(contratDTO.getNom(),dateDebut, dateFin, contratDTO.getMontant(),
                contratDTO.getNomClient(),contratDTO.getModeDuPaiement());
        contrat.setUtilisateur(utilisateur);
        Contrat contrat1 = contratRepository.save(contrat);
        utilisateur.addContrats(contrat1);

        ContratDTO contratDTO1 = new ContratDTO(contrat1.getId(),contrat1.getNom(),
                contratDTO.getDateDebut(), contratDTO.getDateFin(),contrat1.getNomClient(),contrat1.getMontant(),
                contrat1.getModeDuPaiement());

        return  contratDTO1;
    }
}
