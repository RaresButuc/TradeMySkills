package com.trademyskills.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.trademyskills.enums.TypeOfUser;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    private TypeOfUser typeOfUser;

    private String name;

    private String email;

    private String phoneNumber;

    @OneToMany
    private List<Offer> activeOffers;

    @OneToMany
    private List<Offer> formerOffers;

    @OneToMany
    private List<Rating> ratings;
}
