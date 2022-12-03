package com.projet.repositories;


import com.projet.entities.Role;
import com.projet.entities.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepo extends JpaRepository<Role, Integer> {
    Role findByRole(RoleType roleMembre);
}