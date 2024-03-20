package com.trademyskills.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
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

    @NotNull
    @NotBlank
    private String comment;

    @ManyToOne
    private User from;
    @ManyToOne
    private User to;
}
