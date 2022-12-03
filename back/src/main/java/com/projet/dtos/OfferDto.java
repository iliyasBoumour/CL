package com.projet.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
public class OfferDto {
    private String titre;
    private String description;
    private List<Integer> categoriesId;

    private boolean isArchived;


}
