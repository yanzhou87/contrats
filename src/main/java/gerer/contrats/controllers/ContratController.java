package gerer.contrats.controllers;

import gerer.contrats.forms.ContratDTO;
import gerer.contrats.forms.UtilisateurDTO;
import gerer.contrats.model.Utilisateur;
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
@CrossOrigin(origins = "http://localhost:3000")
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

    @GetMapping("/utilisateur/${nomutilisateur}")
    public ResponseEntity<UtilisateurDTO> getUtilisateurParNom(@PathVariable String nomutilisateur) {
        return new ResponseEntity<>(serviceUtilisateur.getUtilisateurParNom(nomutilisateur), HttpStatus.OK);
    }
}
