package com.projet.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
public class OfferResponseDto {
    private int id;
    private String title;
    private String description;
}
