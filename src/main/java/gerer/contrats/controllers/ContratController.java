package gerer.contrats.controllers;

import gerer.contrats.forms.ContratDTO;
import gerer.contrats.forms.UtilisateurDTO;
import gerer.contrats.service.ServiceContrat;
import gerer.contrats.service.ServiceUtilisateur;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3001")
public class ContratController {

    Logger logger = LoggerFactory.getLogger(ContratController.class);

    private ServiceContrat serviceContrat;
    private ServiceUtilisateur serviceUtilisateur;

    public ContratController(ServiceContrat serviceContrat, ServiceUtilisateur serviceUtilisateur) {
        this.serviceContrat = serviceContrat;
        this.serviceUtilisateur = serviceUtilisateur;
    }

    @GetMapping("/clients")
    public ResponseEntity<List<ContratDTO>> getAllContrat() {
        return new ResponseEntity<>(serviceContrat.getAllContrats(), HttpStatus.OK);
    }

    @GetMapping("/{nomClient}/listeContrat")
    public ResponseEntity<List<ContratDTO>> getAllContratParClient(@PathVariable String nomClient) {
        return new ResponseEntity<>(serviceContrat.getContratsParNom(nomClient), HttpStatus.OK);
    }

    @GetMapping("/utilisateurs/{nom}")
    public ResponseEntity<UtilisateurDTO> getUtilisateurParNom(@PathVariable String nom) {
        System.out.println("get utli par nom");
        return new ResponseEntity<>(serviceUtilisateur.getUtilisateurParNom(nom), HttpStatus.OK);
    }

    @GetMapping("/utilisateurs")
    public ResponseEntity<List<UtilisateurDTO>> getAllContratParClient() {
        System.out.println("get utlisateurs");
        return new ResponseEntity<>(serviceUtilisateur.getAllUtlisateurs(), HttpStatus.OK);
    }
    @PostMapping("/utilisateurs")
    public ResponseEntity<UtilisateurDTO> ajouterUtilisateur(@RequestBody UtilisateurDTO utilisateurDTO) {
        System.out.println("post : " + utilisateurDTO);
        if(!serviceUtilisateur.verifierUnique(utilisateurDTO.getNom(),utilisateurDTO.getCourriel())){
            System.out.println("valide courriel : " + HttpStatus.NOT_FOUND);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(serviceUtilisateur.saveUtilisateur(utilisateurDTO), HttpStatus.CREATED);
    }
}
