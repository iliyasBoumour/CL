package com.projet.services;

import com.projet.entities.Categorie;
import com.projet.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriesServiceImpl implements CategoriesService {

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public List<Categorie> getAllCategories() {
        return categoryRepository.findAll();
    }
}
