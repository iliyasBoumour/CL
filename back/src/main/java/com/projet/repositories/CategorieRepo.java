package com.projet.repositories;


import com.projet.entities.Association;
import com.projet.entities.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategorieRepo extends JpaRepository<Categorie, Integer> {
}