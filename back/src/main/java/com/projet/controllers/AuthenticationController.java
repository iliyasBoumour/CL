package com.projet.controllers;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.projet.dtos.JwtResponse;
import com.projet.dtos.LoginRequest;
import com.projet.dtos.Message;
import com.projet.dtos.SignupRequest;
import com.projet.entities.Membre;
import com.projet.entities.Role;
import com.projet.entities.RoleType;
import com.projet.repositories.MembreRepo;
import com.projet.repositories.RoleRepo;
import com.projet.security.jwt.JwtUtils;
import com.projet.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/authentication")
public class AuthenticationController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    MembreRepo memberRepository;

    @Autowired
    RoleRepo roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/connexion")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Set<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toSet());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/inscription")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (memberRepository.existsByNomUtilisateur(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new Message(HttpStatus.CONFLICT,"Error: Username is already taken!"));
        }

        if (memberRepository.existsByEmailAdress(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new Message(HttpStatus.CONFLICT,"Error: Email is already in use!"));
        }

        // Create new members's account
        Membre member = new Membre(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByRole(RoleType.ROLE_MEMBRE);
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "REPRESENTATIVE":
                        Role modRole = roleRepository.findByRole(RoleType.ROLE_REPRESENTANT);
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByRole(RoleType.ROLE_MEMBRE);
                        roles.add(userRole);
                }
            });
        }

        member.setRoles(roles);
        memberRepository.save(member);

        return ResponseEntity.ok(new Message(HttpStatus.CREATED,"User registered successfully!"));
    }
}