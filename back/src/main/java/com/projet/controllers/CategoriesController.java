package com.projet.controllers;

import com.projet.entities.Categorie;
import com.projet.services.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoriesController {


    @Autowired
    CategoriesService categoriesService;

    @GetMapping
    public List<Categorie> getAllCategories(){
        return categoriesService.getAllCategories();
    }
}
