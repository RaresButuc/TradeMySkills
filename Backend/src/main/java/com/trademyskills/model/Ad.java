package com.trademyskills.model;

import com.trademyskills.enums.StatusOfAd;
import com.trademyskills.enums.TypeOfAd;
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

    private TypeOfAd typeOfAd;

    private Double price;

    @ManyToOne
    private User user;

}
