package gerer.contrats.service;

import gerer.contrats.forms.ContratDTO;
import gerer.contrats.model.Contrat;
import gerer.contrats.repository.ContratRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

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
            ContratDTO contratDTO = new ContratDTO(c.getId(),c.getNom(),
                    c.getDateDebut().toString(),c.getDateFin().toString(), c.getNomClient(), c.getMontant());
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
            ContratDTO contratDTO = new ContratDTO(c.getId(),c.getNom(),c.getDateDebut().toString(),c.getDateFin().toString(),c.getNomClient(),c.getMontant());
            listResultat.add(contratDTO);
        }
        return listResultat;
    }
}
