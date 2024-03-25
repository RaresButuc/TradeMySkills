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

    @NotNull
    @NotBlank
    @ManyToOne
    private User from;

    @NotNull
    @NotBlank
    @ManyToOne
    private User to;
}
