package gerer.contrats.service;

import gerer.contrats.forms.UtilisateurDTO;
import gerer.contrats.model.Utilisateur;
import gerer.contrats.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;

@Service
public class ServiceUtilisateur {
    private UtilisateurRepository utilisateurRepository;

    public UtilisateurDTO getUtilisateurParNom(String nomutilisateur) {
        Utilisateur utilisateur = utilisateurRepository.findUtilisateurPyNom(nomutilisateur).get();
        UtilisateurDTO utilisateurDTO = new UtilisateurDTO(utilisateur.getId(),utilisateur.getNom(),
                utilisateur.getMotDePasse(),utilisateur.getCourriel());
       return utilisateurDTO;
    }
}
