package com.projet.entities;


import javax.persistence.*;
import java.util.Set;

@Entity
public class Categorie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nom;

    private String description;

    @ManyToMany
    private Set<Offre> offres;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Offre> getOffres() {
        return offres;
    }

    public void setOffres(Set<Offre> offres) {
        this.offres = offres;
    }
}
