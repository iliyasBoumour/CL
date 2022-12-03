package com.projet.dtos;

import com.projet.entities.StatusType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DemandeResponseDto {
    private int id;
    private String offerName;
    private String requestor;
    private StatusType status;
    private boolean isArchived;
}
