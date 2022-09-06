package gerer.contrats.repository;

import gerer.contrats.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UtilisateurRepository  extends JpaRepository<Utilisateur,Long> {

    @Query("select u from Utilisateur u where u.nom like :nom")
    List<Utilisateur> findUtilisateurByNom(@Param("nom") String nom);
}
