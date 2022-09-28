
import gerer.contrats.forms.UtilisateurDTO;
import gerer.contrats.model.Utilisateur;
import gerer.contrats.repository.UtilisateurRepository;
import gerer.contrats.service.ServiceUtilisateur;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
public class ServiceTest {
    @InjectMocks
    private ServiceUtilisateur utilisateurService;

    @Mock
    private UtilisateurRepository utilisateurRepository;

    Utilisateur user;

    @BeforeEach
    void setup() {
        user = new Utilisateur(
                "yan",
                "123456",
                "yanxx@gmail.com"
               );
    }

    @Test
    @DisplayName("Test findAll")
    void testFindAllUser() {

        //Arrange
        List<Utilisateur> utilisateurs = new ArrayList<>();
        Utilisateur utilisateur = new Utilisateur("yan","123456","yanxx@gmail.com");
        Utilisateur utilisateur1 = new Utilisateur("yanzz","123456","yanz@gmail.com");
        Utilisateur utilisateur2 = new Utilisateur("yanyy","123456","yany@gmail.com");

        utilisateurs.add(utilisateur);
        utilisateurs.add(utilisateur1);
        utilisateurs.add(utilisateur2);

        when(utilisateurRepository.findAll()).thenReturn(utilisateurs);

        //Act
        List<Utilisateur> utilisateurlist = utilisateurService.findAll();

        //Assert
        assertThat(utilisateurlist.size()).isEqualTo(3);
    }

    @Test
    @DisplayName("Test findUserByName")
    void testFindUserByName(){
        when(utilisateurRepository.findUtilisateurByNom(anyString())).thenReturn(Optional.of(user));

        UtilisateurDTO utilisateurDTO = utilisateurService.getUtilisateurParNom(user.getNom()).get();

        assertThat(utilisateurDTO.getNom()).isEqualTo("yan");
    }

}
