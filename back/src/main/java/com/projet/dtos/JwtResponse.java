package com.projet.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {

    private String token;

    private String type = "Bearer";

    private int id;

    private String username;

    private String email;

    private Set<String> role;


    public JwtResponse(String jwt, int id, String username, String email, Set<String> roles) {
        this.token = jwt;
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = roles;
    }
}

