package com.trademyskills.model;

import com.trademyskills.enums.StatusOfAd;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
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

    @NotNull
    @NotBlank
    private String title;

    @NotNull
    @NotBlank
    @Column(length = 1000)
    private String description;

    @NotNull
    @NotBlank
    @ManyToOne
    @JoinColumn
    private TypeOfAd typeOfAd;

    @NotNull
    @NotBlank
    private Double price;

    @NotNull
    @NotBlank
    @Embedded
    private LocationOfAd location;

    @ManyToOne
    private User owner;

    @ManyToOne
    private User worker;

    @ManyToMany
    private List<User> rejectedWorkers;
}
