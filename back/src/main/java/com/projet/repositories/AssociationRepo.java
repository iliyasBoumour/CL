package com.projet.repositories;


import com.projet.entities.Association;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssociationRepo extends JpaRepository<Association, Integer> {
}
