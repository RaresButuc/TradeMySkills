package com.trademyskills.model;

import com.trademyskills.enums.StatusOfAd;
import jakarta.persistence.*;
import lombok.*;

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

    private String name;

    private String description;

    @ManyToOne
    @JoinColumn
    private TypeOfAd typeOfAd;

    private Double price;
    @Embedded
    private LocationOfAd location;

    @ManyToOne
    private User user;

}
