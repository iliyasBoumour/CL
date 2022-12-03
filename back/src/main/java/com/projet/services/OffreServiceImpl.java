package com.projet.services;

import com.projet.dtos.DemandeResponseDto;
import com.projet.dtos.OfferDto;
import com.projet.dtos.OfferResponseDto;
import com.projet.entities.*;
import com.projet.exceptions.AssociationNotFound;
import com.projet.exceptions.CategoryNotFoundException;
import com.projet.exceptions.OffreNonTrouveException;
import com.projet.repositories.*;
import com.projet.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OffreServiceImpl implements OffreService{

    @Autowired
    OffreRepo offreRepo;

    @Autowired
    DemandeRepo demandeRepo;

    @Autowired
    MembreRepo membreRepo;

    @Autowired
    AssociationRepo associationRepo;

    @Autowired
    CategorieRepo categorieRepo;
    @Override
    public List<OfferResponseDto> getAllOffersByPage() {
        List<Offre> offers =  offreRepo.findAll();
        List<OfferResponseDto> offerResponseDtos = new ArrayList<>();
        for (Offre offre : offers) {
            offerResponseDtos.add(new OfferResponseDto(offre.getId(), offre.getTitre(), offre.getDescription()));
        }
      return offerResponseDtos;
    }

    @Override
    @PreAuthorize("hasRole('MEMBRE')")
    public Offre getOffreById(int id) {
        return offreRepo.getReferenceById(id);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('REPRESENTANT')")
    public OfferResponseDto createOffer(OfferDto offerDto) throws AssociationNotFound, CategoryNotFoundException {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Membre membre = membreRepo.findById(userDetails.getId()).get();
        List<Categorie> categories = new ArrayList<>();
        for (int id : offerDto.getCategoriesId()) {
            Categorie categorie = categorieRepo.findById(id)
                    .orElseThrow(() -> new CategoryNotFoundException("Cette catégorie n'existe pas"));
            categories.add(categorie);
        }
        Offre offre = new Offre();
        offre.setAssociation(membre.getAssociation());
        offre.setCategories(categories);
        offre.setDescription(offerDto.getDescription());
        offre.setDateDePublication(new Date(System.currentTimeMillis()));
        offre.setTitre(offerDto.getTitre());
        Offre PersistedOffre = offreRepo.save(offre);
        return new OfferResponseDto(PersistedOffre.getId(), PersistedOffre.getTitre(), PersistedOffre.getDescription());
    }
    @Override
    @PreAuthorize("hasRole('REPRESENTANT')")
    public List<DemandeResponseDto> getAllOfferDemands() throws OffreNonTrouveException {
        List<Demande> demandes = demandeRepo.findAll();
        List<DemandeResponseDto> demandeResponseDtos = new ArrayList<>();
        for (Demande demande : demandes) {
            demandeResponseDtos.add(new DemandeResponseDto(demande.getId(), demande.getOffre().getTitre(), demande.getMembre().getNomUtilisateur(),demande.getStatus(), demande.isArchived()));
        }
        return demandeResponseDtos;
    }

    @Override
    @PreAuthorize("hasRole('REPRESENTANT')")
    public ResponseEntity<Map<String, Integer>> getStatistics() {
        Membre membre = (Membre) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Association association = membre.getAssociation();
        Map<String, Integer> demandStatistics = new HashMap<>();
        demandStatistics.put("total", offreRepo.countByAssociationId(association.getId()));
        demandStatistics.put("archivées", offreRepo.countByAssociationIdAndArchived(association.getId(), true));
        demandStatistics.put("active", offreRepo.countByAssociationIdAndArchived(association.getId(), false));
        return ResponseEntity.ok(demandStatistics);
    }
}
