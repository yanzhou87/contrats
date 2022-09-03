package gerer.contrats.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "contrat", schema = "public")
public class Contrat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nom;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private float montant;

    public Contrat(String nom, LocalDate dateDebut, LocalDate dateFin, float montant) {
        this.nom = nom;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.montant = montant;
    }
}
