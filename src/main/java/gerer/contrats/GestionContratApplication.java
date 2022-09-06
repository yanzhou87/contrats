package gerer.contrats;

import gerer.contrats.forms.ContratDTO;
import gerer.contrats.model.Contrat;
import gerer.contrats.model.Utilisateur;
import gerer.contrats.service.ServiceContrat;
import gerer.contrats.service.ServiceUtilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
public class GestionContratApplication implements CommandLineRunner {

    @Autowired
    private ServiceContrat serviceContrat;
    private ServiceUtilisateur serviceUtilisateur;

    public static void main(String[] args) {
        SpringApplication.run(GestionContratApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        LocalDate debut = LocalDate.now();
        LocalDate fin = LocalDate.now().plusDays(30);
        LocalDate fin1 = LocalDate.now().plusDays(15);
        LocalDate fin2 = LocalDate.now().plusDays(45);
        LocalDate fin3 = LocalDate.now().plusDays(10);
        Contrat contrat = serviceContrat.saveContrat(new Contrat("Yan Zhou", debut, fin1,500));
        Contrat contrat1 = serviceContrat.saveContrat(new Contrat("an Zhou", debut, fin,500));
        Contrat contrat2 = serviceContrat.saveContrat(new Contrat("an Zhou", debut, fin2,500));
        Contrat contrat3 = serviceContrat.saveContrat(new Contrat("Yan Zhou", debut, fin3,500));
        List<ContratDTO> contratDTOS = serviceContrat.getContratsParNom("Yan Zhou");

        System.out.println(serviceContrat.getAllContrats());


    }
}
