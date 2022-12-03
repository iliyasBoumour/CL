package com.projet.controllers;

import com.projet.dtos.DemandeDecisionDto;
import com.projet.dtos.DemandeDto;
import com.projet.dtos.DemandeResponseDto;
import com.projet.dtos.Message;
import com.projet.exceptions.DemandeNotFoundException;
import com.projet.exceptions.MembreNonTrouveException;
import com.projet.exceptions.OffreNonTrouveException;
import com.projet.services.DemandeService;
import com.projet.services.OffreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/demandes")
public class DemandeController {

    @Autowired
    DemandeService demandeService;

    @Autowired
    OffreService offreService;

    @PostMapping("/{id}")
    public ResponseEntity<Message> createDemand(@PathVariable int id) throws OffreNonTrouveException, MembreNonTrouveException {
        return demandeService.createDemand(id);
    }
    @GetMapping
    public List<DemandeResponseDto> getAllOfferDemands() throws OffreNonTrouveException {
        return offreService.getAllOfferDemands();
    }
    @PostMapping("/{id}/accept")
    public ResponseEntity<Message> accepterDemande(@PathVariable int id) throws DemandeNotFoundException {
        return demandeService.acceptDemand(id);
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<Message> refuserDemande(@PathVariable int id) throws DemandeNotFoundException {
        return demandeService.rejectDemand(id);
    }

    @PostMapping("/{id}/transfer")
    public ResponseEntity<Message> transfererDemande(@PathVariable int id) throws DemandeNotFoundException {
        return demandeService.transferDemand(id);
    }


}
