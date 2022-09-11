package gerer.contrats.service;

import gerer.contrats.forms.UtilisateurDTO;
import gerer.contrats.model.Contrat;
import gerer.contrats.model.Utilisateur;
import gerer.contrats.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceUtilisateur {
    private UtilisateurRepository utilisateurRepository;

    public ServiceUtilisateur(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    public UtilisateurDTO getUtilisateurParNom(String nom) {
        System.out.println("nom " + nom );
        Utilisateur utilisateur = utilisateurRepository.findUtilisateurByNom(nom).get(0);
        System.out.println("utilisateur : " + utilisateur);
        UtilisateurDTO utilisateurDTO = new UtilisateurDTO(utilisateur.getId(),utilisateur.getNom(),
                utilisateur.getMotDePasse(),utilisateur.getCourriel());
       return utilisateurDTO;
    }

    public UtilisateurDTO saveUtilisateur(UtilisateurDTO utilisateurDTO) {
        List<Contrat> contrats = new ArrayList<>();

        Utilisateur utilisateur = new Utilisateur(utilisateurDTO.getId(),utilisateurDTO.getNom()
                    ,utilisateurDTO.getMotDePasse(), utilisateurDTO.getCourriel(), contrats);
        Utilisateur utilisateur1 = utilisateurRepository.save(utilisateur);
        UtilisateurDTO utilisateurDTO1 = new UtilisateurDTO(utilisateur1.getId(), utilisateur1.getNom(),
                    utilisateur1.getCourriel(), utilisateur1.getMotDePasse());

        return utilisateurDTO1;
    }

    public boolean verifierUnique(String nom,String courriel){
        List<Utilisateur> utilisateurs =utilisateurRepository.findAll();
        if(utilisateurs == null){
            return true;
        }
        boolean courrielUnique = true;
        boolean nomlUnique = true;
        for(Utilisateur utilisateur : utilisateurs){
            if (utilisateur.getNom().equals(nom)) {
                nomlUnique = false;
            }
            if(utilisateur.getCourriel().equals(courriel)){
                courrielUnique = false;
            }
        }
        return courrielUnique && nomlUnique;
    }
    public boolean valideCourriel(String courriel){
        if(courriel == null){
            return false;
        }
        final String EMAIL_REGEX = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
        return courriel.matches(EMAIL_REGEX);
    }

    public List<UtilisateurDTO> getAllUtlisateurs() {
        List<Utilisateur> utilisateurs = utilisateurRepository.findAll();
        List<UtilisateurDTO> utilisateurDTOS = new ArrayList<>();
        for(Utilisateur utilisateur : utilisateurs){
            UtilisateurDTO utilisateurDTO = new UtilisateurDTO(utilisateur.getId(), utilisateur.getNom(),
                    utilisateur.getMotDePasse(),utilisateur.getCourriel());
            utilisateurDTOS.add(utilisateurDTO);
        }

        return utilisateurDTOS;
    }
}
