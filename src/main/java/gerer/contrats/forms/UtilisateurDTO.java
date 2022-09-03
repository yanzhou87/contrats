package gerer.contrats.forms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UtilisateurDTO {

    private long id;
    private String nom;
    private String motDePasse;
    private String courriel;

}
