package com.projet.controllers;

import com.projet.dtos.DemandeResponseDto;
import com.projet.dtos.Message;
import com.projet.dtos.OfferDto;
import com.projet.dtos.OfferResponseDto;
import com.projet.entities.Demande;
import com.projet.entities.Offre;
import com.projet.exceptions.AssociationNotFound;
import com.projet.exceptions.CategoryNotFoundException;
import com.projet.exceptions.OffreNonTrouveException;
import com.projet.services.DemandeService;
import com.projet.services.OffreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/offers")
public class OffreController {


    @Autowired
    OffreService offreService;

    @GetMapping
    public List<OfferResponseDto> getAllOffers(){
        return offreService.getAllOffersByPage();
    }

    @GetMapping("/{id}")
    public Offre getOfferById(@PathVariable int id){
        return offreService.getOffreById(id);
    }


    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Integer>> offreStatistics(){
        return offreService.getStatistics();
    }

    @PostMapping
    public OfferResponseDto creerOffre(@RequestBody OfferDto offerDto) throws CategoryNotFoundException, AssociationNotFound {
        return offreService.createOffer(offerDto);
    }

}
