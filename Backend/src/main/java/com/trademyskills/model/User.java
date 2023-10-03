package com.trademyskills.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.trademyskills.enums.TypeOfUser;
import lombok.*;

import jakarta.persistence.*;
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
    private Long id;

    @Enumerated(EnumType.STRING)
    private TypeOfUser typeOfUser;

    private String name;

    private String email;

    private String phoneNumber;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Ad> ads;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Rating> ratings;
}
