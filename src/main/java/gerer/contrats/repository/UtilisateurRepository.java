package gerer.contrats.repository;

import gerer.contrats.model.Utilisateur;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UtilisateurRepository {

    @Query("select u from Utilisateur u where u.nom = :nom")
    Optional<Utilisateur> findUtilisateurPyNom(@Param("nom") String nom);
}
