package com.projet.services;

import com.projet.dtos.DemandeDecisionDto;
import com.projet.dtos.DemandeDto;
import com.projet.dtos.Message;
import com.projet.exceptions.DemandeNotFoundException;
import com.projet.exceptions.MembreNonTrouveException;
import com.projet.exceptions.OffreNonTrouveException;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface DemandeService {
    ResponseEntity<Message> createDemand(int id) throws MembreNonTrouveException, OffreNonTrouveException;
    
    ResponseEntity<Message> transferDemand(int id) throws DemandeNotFoundException;

    ResponseEntity<Map<String, Integer>> getStatistics();

    ResponseEntity<Message> acceptDemand(int id) throws DemandeNotFoundException;

    ResponseEntity<Message> rejectDemand(int id) throws DemandeNotFoundException;
}
