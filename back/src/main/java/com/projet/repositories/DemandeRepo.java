package com.projet.repositories;


import com.projet.entities.Association;
import com.projet.entities.Demande;
import com.projet.entities.StatusType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DemandeRepo extends JpaRepository<Demande, Integer> {

    @Query("select count(d) from Demande d where d.offre.association.id=?1")
    Integer countByAssociationId(int id);

    @Query("select count(d) from Demande d where d.offre.association.id=?1 and d.status=?2")
    Integer countByAssociationIdAndDecision(int id, StatusType type);
}
