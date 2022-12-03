package com.projet.entities;


import lombok.Data;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
@Data
public class Offre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String titre;

    private String description;

    private Date dateDePublication;

    private boolean isArchived;

    @OneToMany
    private List<Categorie> categories;
    @OneToMany
    private List<Demande> demandes;
    @ManyToOne
    private Association association;


}
