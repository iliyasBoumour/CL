package com.projet.entities;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Data
@NoArgsConstructor
public class Demande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private Date dateDemande;

    private int rang;

    private StatusType status;

    private boolean isArchived;

    private String commentaire;

    @ManyToOne
    private Membre membre;

    @ManyToOne
    private Offre offre;

}
