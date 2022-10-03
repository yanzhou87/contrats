package gerer.contrats.service;

import gerer.contrats.forms.ContratDTO;
import gerer.contrats.model.Contrat;
import gerer.contrats.repository.ContratRepository;
import org.springframework.http.converter.json.GsonBuilderUtils;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class ServiceContrat {
    private ContratRepository contratRepository;

    public ServiceContrat(ContratRepository contratRepository) {
        this.contratRepository = contratRepository;
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
                    c.getDateFin().toString(),c.getNomClient(),c.getMontant(),c.getModeDuPaiement(), c.isRappelDePaiement());
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
                    c.getDateFin().toString(),c.getNomClient(),c.getMontant(),c.getModeDuPaiement(), c.isRappelDePaiement());
            listResultat.add(contratDTO);
        }
        return listResultat;
    }
    public ContratDTO getContratParId(long id) {
        Contrat contrat =  contratRepository.findById(id).get();
        ContratDTO contratDTO = new ContratDTO(contrat.getId(),contrat.getNom(),contrat.getDateDebut().toString(),
                contrat.getDateFin().toString(), contrat.getNomClient(), contrat.getMontant(),contrat.getModeDuPaiement(),
                contrat.isRappelDePaiement());
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
                        contrat.getDateDebut().toString(),contrat.getDateFin().toString(),contrat.getNomClient(),contrat.getMontant(),contrat.getModeDuPaiement(),
                        contrat.isRappelDePaiement());
                contratDTOS.add(contratDTO);
            }
        }
        return contratDTOS;
    }
}
