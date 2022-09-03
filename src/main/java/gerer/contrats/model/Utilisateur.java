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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nom;
    private String motDePasse;
    private String courriel;

    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL)
    private List<Contrat> contrats;

    public void addContrats(Contrat contrat) {
        contrats.add(contrat);
        contrat.setUtilisateur(this);
    }
}

