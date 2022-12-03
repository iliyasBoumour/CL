package com.projet.repositories;


import com.projet.entities.Association;
import com.projet.entities.Offre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OffreRepo extends JpaRepository<Offre, Integer> {
    @Query("select count(o) from Offre o where o.association.id=?1")
    int countByAssociationId(int id);

    @Query("select count(o) from Offre o where o.association.id=?1 and o.isArchived = ?2")
    int countByAssociationIdAndArchived(int id, boolean archivee);
}
