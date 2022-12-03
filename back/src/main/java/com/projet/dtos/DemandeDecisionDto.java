package com.projet.dtos;

import lombok.Data;

@Data
public class DemandeDecisionDto {
    private boolean isAccepted;
    private String commentaire;
}
