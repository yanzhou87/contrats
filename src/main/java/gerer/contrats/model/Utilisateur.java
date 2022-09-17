package gerer.contrats.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "utilisateur", schema = "public")
public class Utilisateur {
    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @GeneratedValue(generator = "utilisateur_seq")
    private long id;

    private String nom;
    private String motDePasse;
    private String courriel;

    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL)
    private List<Contrat> contrats;

    public Utilisateur(String nom, String motDePasse, String courriel) {
        this.nom = nom;
        this.motDePasse = motDePasse;
        this.courriel = courriel;
    }

    public Utilisateur(String nom, String motDePasse, String courriel, List<Contrat> contrats) {
        this.nom = nom;
        this.motDePasse = motDePasse;
        this.courriel = courriel;
        this.contrats = contrats;
    }

    public void addContrats(Contrat contrat) {
        contrats.add(contrat);
        contrat.setUtilisateur(this);
    }

    @Override
    public String toString() {
        return "Utilisateur{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", motDePasse='" + motDePasse + '\'' +
                ", courriel='" + courriel + '\'' +
                ", contrats=" + contrats +
                '}';
    }
}

