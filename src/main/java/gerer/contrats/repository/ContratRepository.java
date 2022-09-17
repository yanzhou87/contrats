package gerer.contrats.repository;

import gerer.contrats.model.Contrat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ContratRepository extends JpaRepository<Contrat, Long> {
    @Query("select c from Contrat c where c.nom like :nom and c.nomClient like %:nomClient%")
    List<Contrat> findContratsParNomClient(String nom, String nomClient);
}
