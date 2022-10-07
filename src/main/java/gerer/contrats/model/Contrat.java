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
    private String nomClient;
    private String modeDuPaiement;

    @ManyToOne
    @JoinColumn(name = "UTILISATEUR_ID")
    private Utilisateur utilisateur;

    public Contrat(String nom, LocalDate dateDebut, LocalDate dateFin, float montant ,String nomClient) {
        this.nom = nom;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.montant = montant;
        this.nomClient = nomClient;
    }

    public Contrat(String nom, LocalDate dateDebut, LocalDate dateFin, float montant, String nomClient, String modeDuPaiement) {
        this.nom = nom;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.montant = montant;
        this.nomClient = nomClient;
        this.modeDuPaiement = modeDuPaiement;
    }

    @Override
    public String toString() {
        return "Contrat{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", dateDebut=" + dateDebut +
                ", dateFin=" + dateFin +
                ", montant=" + montant +
                '}';
    }
}
