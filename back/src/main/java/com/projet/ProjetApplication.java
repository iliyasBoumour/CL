package com.projet;

import com.projet.entities.Association;
import com.projet.entities.Membre;
import com.projet.entities.Role;
import com.projet.entities.RoleType;
import com.projet.repositories.AssociationRepo;
import com.projet.repositories.MembreRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@SpringBootApplication
public class ProjetApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjetApplication.class, args);
	}



	@Bean
	CommandLineRunner start(MembreRepo memberRepository,
							AssociationRepo associationRepository,
							PasswordEncoder bCryptPasswordEncoder) {
		return args -> {
			Association association = associationRepository.save(Association.builder()
					.description("description d'asso")
					.nom("nom de l'asso")
					.build());
			Membre representer = memberRepository.save(Membre.builder()
					.association(association)
							.emailAdress("email@email.com")
							.password(bCryptPasswordEncoder.encode("user"))
							.prenom("user")
							.nomUtilisateur("user")
							.roles(Set.of(Role.builder()
									.role(RoleType.ROLE_REPRESENTANT)
									.build()
									,Role.builder().
							role(RoleType.ROLE_MEMBRE)
							.build()))
					.build());


			for (int i=0 ; i<2 ; i++){
				memberRepository.save(Membre.builder()
						.nomUtilisateur("membre"+i)
						.nom("member"+i)
								.password(bCryptPasswordEncoder.encode("Sol@sol125242"))
								.nomUtilisateur("member"+i)
								.emailAdress("email "+i+"@email.com")
						.roles(Set.of(Role.builder()
								.role(RoleType.ROLE_MEMBRE)
								.build()))
						.association(association)
						.build());
			}
		};
	}

}
