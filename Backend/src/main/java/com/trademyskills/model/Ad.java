package com.trademyskills.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.trademyskills.enums.StatusOfAd;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "ads")
public class Ad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private StatusOfAd statusOfAd;

    private String name;

    private String description;

    @ManyToOne
    @JoinColumn
    private TypeOfAd typeOfAd;

    private Double price;
    private String location;

    @ManyToOne
    private User user;

}
