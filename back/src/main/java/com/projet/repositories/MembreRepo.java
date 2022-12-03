package com.projet.repositories;


import com.projet.entities.Association;
import com.projet.entities.Membre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MembreRepo extends JpaRepository<Membre, Integer> {
    @Query("select m from Membre m where m.association.id=?1" )
    List<Membre> findAllByAssociationId(int id);

    boolean existsByNomUtilisateur(String username);

    boolean existsByEmailAdress(String email);

    Membre findByNomUtilisateur(String username);
}