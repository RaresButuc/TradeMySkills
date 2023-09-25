package com.trademyskills.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.trademyskills.model.Ad;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "categories")
public class TypeOfAd {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nameOfCategory;

    @JsonIgnore
    @OneToMany(mappedBy="typeOfAd")
    private List<Ad> listOfAds;
//    CONSTRUCTIONS,
//    CONFECTIONS,
//    COOKING,
//    DELIVERY,
//    EVENTS,
//    EDUCATION,
//    CLEANING,
//    PETCARE,
//    BABYSITTER,
//    OTHER,
}
