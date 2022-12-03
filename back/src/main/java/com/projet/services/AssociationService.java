package com.projet.services;

import com.projet.entities.Membre;

import java.util.List;

public interface AssociationService {
    List<Membre> getAllMembers(int id);
}
