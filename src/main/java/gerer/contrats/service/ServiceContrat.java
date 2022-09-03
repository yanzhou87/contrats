package gerer.contrats.service;

import gerer.contrats.forms.ContratDTO;
import gerer.contrats.model.Contrat;
import gerer.contrats.repository.ContratRepository;
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
                    c.getDateDebut().toString(),c.getDateFin().toString(),c.getMontant());
            contratDTOs.add(contratDTO);
        }
        System.out.println("------" +contratDTOs);
        return contratDTOs;
    }
    public List<ContratDTO> getContratsParNom(String nom){
        List<Contrat[]> contratsParNom = contratRepository.findContratBySeach(nom);
        List<ContratDTO> contratDTOs = new ArrayList<>();
        for(Contrat[] contrats : contratsParNom){
            ContratDTO contratDTO = new ContratDTO(contrats[0].getId(),contrats[0].getNom(),
                    contrats[0].getDateDebut().toString(),contrats[0].getDateFin().toString(),contrats[0].getMontant());
            contratDTOs.add(contratDTO);
        }
        contratDTOs.sort(Comparator.comparing(ContratDTO::getId));
        return contratDTOs;
    }
}
