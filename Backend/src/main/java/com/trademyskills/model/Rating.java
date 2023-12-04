package com.trademyskills.model;

import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "ratings")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double star;

    private String comment;

    @ManyToOne
    private User user;
//    @ManyToOne
//    private User from;
//    @ManyToOne
//    private User to;
}
