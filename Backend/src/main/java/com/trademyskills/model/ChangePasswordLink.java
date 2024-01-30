package com.trademyskills.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.*;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class ChangePasswordLink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private UUID uuid;

    private String email;

    private LocalDateTime createdDate;

    private boolean isClosed;

}
