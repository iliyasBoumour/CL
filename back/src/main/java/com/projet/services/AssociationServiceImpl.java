package com.projet.services;

import com.projet.entities.Membre;
import com.projet.repositories.AssociationRepo;
import com.projet.repositories.MembreRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssociationServiceImpl implements AssociationService{

    @Autowired
    MembreRepo membreRepo;
    @Override
    public List<Membre> getAllMembers(int id) {
        return membreRepo.findAllByAssociationId(id);
    }
}
