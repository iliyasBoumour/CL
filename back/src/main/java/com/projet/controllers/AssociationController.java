package com.projet.controllers;

import com.projet.entities.Membre;
import com.projet.services.AssociationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/association")
public class AssociationController {

    @Autowired
    AssociationService associationService;

    @GetMapping("/{id}/membres")
    public List<Membre> getAllMembers(@PathVariable int id){
        return associationService.getAllMembers(id);
    }
}
