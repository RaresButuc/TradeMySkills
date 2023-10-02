package com.trademyskills.model;

import lombok.*;

import javax.persistence.Embeddable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
public class LocationOfAd {
    String nameOfTheCounty;
    String nameOfTheCity;
}
