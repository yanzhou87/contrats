package gerer.contrats.controllers;

import gerer.contrats.forms.ContratDTO;
import gerer.contrats.service.ServiceContrat;
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
    
    public ContratController(ServiceContrat serviceContrat) {
        this.serviceContrat = serviceContrat;
    }

    @GetMapping("/clients")
    public ResponseEntity<List<ContratDTO>> getAllContrat() {
        return new ResponseEntity<>(serviceContrat.getAllContrats(), HttpStatus.OK);
    }

    @GetMapping("/{nomClient}/listeContrat")
    public ResponseEntity<List<ContratDTO>> getAllContratParClient(@PathVariable String nomClient) {
        return new ResponseEntity<>(serviceContrat.getContratsParNom(nomClient), HttpStatus.OK);
    }
}
