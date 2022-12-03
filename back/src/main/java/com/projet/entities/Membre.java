package com.projet.entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Builder
@Data  @AllArgsConstructor @NoArgsConstructor
public class Membre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String prenom;

    private String nom;

    private String nomUtilisateur;

    private String emailAdress;

    private String password;

    @OneToMany(
            cascade = CascadeType.ALL
    )
    private Set<Role> roles;
    @OneToMany
    private List<Demande> demandes;
    @ManyToOne
    private Association association;


    public Membre(String username, String email, String password) {
        this.nomUtilisateur = username;
        this.emailAdress=email;
        this.password=password;

    }
}
