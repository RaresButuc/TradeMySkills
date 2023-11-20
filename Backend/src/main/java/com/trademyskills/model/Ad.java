package com.trademyskills.model;

import com.trademyskills.enums.StatusOfAd;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

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

    @Enumerated
    private StatusOfAd statusOfAd;

    private String title;

    @Column(length = 1000)
    private String description;

    @ManyToOne
    @JoinColumn
    private TypeOfAd typeOfAd;

    private Double price;
    @Embedded
    private LocationOfAd location;

    @ManyToMany
    private List<User> users;
}
