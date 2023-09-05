package com.trademyskills.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.trademyskills.enums.TypeOfOffer;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "offers")
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @ManyToOne
    private User user;

    private String name;

    private String description;

    private TypeOfOffer typeOfOffer;

    private Double price;
}
