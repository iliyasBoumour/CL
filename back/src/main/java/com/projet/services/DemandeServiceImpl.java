package com.projet.services;

import com.projet.dtos.Message;
import com.projet.entities.*;
import com.projet.exceptions.DemandeNotFoundException;
import com.projet.exceptions.MembreNonTrouveException;
import com.projet.exceptions.OffreNonTrouveException;
import com.projet.repositories.DemandeRepo;
import com.projet.repositories.MembreRepo;
import com.projet.repositories.OffreRepo;
import com.projet.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class DemandeServiceImpl implements DemandeService{

    @Autowired
    MembreRepo membreRepo;

    @Autowired
    OffreRepo offreRepo;

    @Autowired
    DemandeRepo demandeRepo;


    @Override
    @Transactional
    @PreAuthorize("hasRole('MEMBRE')")
    public ResponseEntity<Message> createDemand(int id) throws MembreNonTrouveException, OffreNonTrouveException {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Membre membre = membreRepo.getReferenceById(userDetails.getId());

        Offre offre = offreRepo.findById(id)
                .orElseThrow(()-> new OffreNonTrouveException("Cette offre n'existe pas"));

        Demande demandeAEnregistrer = new Demande();
        demandeAEnregistrer.setDateDemande(new Date(System.currentTimeMillis()));
        demandeAEnregistrer.setMembre(membre);
        demandeAEnregistrer.setOffre(offre);
        demandeAEnregistrer.setStatus(StatusType.ATTENTE);
        demandeAEnregistrer.setArchived(false);
        demandeAEnregistrer.setCommentaire(null);
        demandeAEnregistrer.setRang(determinRang(offre));
        demandeRepo.save(demandeAEnregistrer);
        return ResponseEntity.ok().body(new Message(HttpStatus.ACCEPTED, "Votre Demande est enregistrée"));
    }


    @Override
    public ResponseEntity<Message> transferDemand(int id) throws DemandeNotFoundException {
        Demande demande = demandeRepo.findById(id)
                .orElseThrow(()-> new DemandeNotFoundException("La demande n'existe pas"));
        Offre offre = demande.getOffre();
        demande.setStatus(StatusType.TRANSFEREE);
        demande.setArchived(true);
        offre.setArchived(true);
        offreRepo.save(offre);
        demandeRepo.save(demande);
        return ResponseEntity.ok()
                .body(new Message(HttpStatus.OK, "la demande est transférée"));
    }

    @Override
    public ResponseEntity<Map<String, Integer>> getStatistics() {
        Membre membre = (Membre) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Association association = membre.getAssociation();
        Map<String, Integer> demandStatistics = new HashMap<>();
        demandStatistics.put("total", demandeRepo.countByAssociationId(association.getId()));
        demandStatistics.put("acceptée", demandeRepo.countByAssociationIdAndDecision(association.getId(), StatusType.ACCEPTE));
        demandStatistics.put("refusée", demandeRepo.countByAssociationIdAndDecision(association.getId(), StatusType.REFUSE));
        demandStatistics.put("en attente", demandeRepo.countByAssociationIdAndDecision(association.getId(), StatusType.ATTENTE));
        demandStatistics.put("transferée", demandeRepo.countByAssociationIdAndDecision(association.getId(), StatusType.TRANSFEREE));
        demandStatistics.put("annulée", demandeRepo.countByAssociationIdAndDecision(association.getId(), StatusType.ANNULEE));
        return ResponseEntity.ok(demandStatistics);
    }

    @Override
    @PreAuthorize("hasRole('REPRESENTANT')")
    public ResponseEntity<Message> acceptDemand(int id) throws DemandeNotFoundException {
        Demande demande = demandeRepo.findById(id)
                .orElseThrow(()-> new DemandeNotFoundException("Cette demande n'existe pas"));
        demande.setStatus(StatusType.ACCEPTE);
        demandeRepo.save(demande);
        return ResponseEntity.ok().body(new Message(HttpStatus.ACCEPTED, "La demande a été acceptée"));
    }

    @Override
    @PreAuthorize("hasRole('REPRESENTANT')")
    public ResponseEntity<Message> rejectDemand(int id) throws DemandeNotFoundException {
        Demande demande = demandeRepo.findById(id)
                .orElseThrow(()-> new DemandeNotFoundException("Cette demande n'existe pas"));
        demande.setStatus(StatusType.REFUSE);
        demandeRepo.save(demande);
        return ResponseEntity.ok().body(new Message(HttpStatus.ACCEPTED, "La demande a été refusée"));
    }

    private int determinRang(Offre offre) {
       List<Demande> demandes = offre.getDemandes();
       if(demandes.isEmpty()) return 1;
       return demandes.size()+1;
    }
}
