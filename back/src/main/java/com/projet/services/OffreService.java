package com.projet.services;

import com.projet.dtos.DemandeResponseDto;
import com.projet.dtos.OfferDto;
import com.projet.dtos.OfferResponseDto;
import com.projet.entities.Demande;
import com.projet.entities.Offre;
import com.projet.exceptions.AssociationNotFound;
import com.projet.exceptions.CategoryNotFoundException;
import com.projet.exceptions.OffreNonTrouveException;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface OffreService {
    List<OfferResponseDto> getAllOffersByPage();

    Offre getOffreById(int id);

    OfferResponseDto createOffer(OfferDto offerDto) throws AssociationNotFound, CategoryNotFoundException;

    List<DemandeResponseDto> getAllOfferDemands() throws OffreNonTrouveException;

    ResponseEntity<Map<String, Integer>> getStatistics();
}
