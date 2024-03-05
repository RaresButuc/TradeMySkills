package com.trademyskills.model;

import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
public class LocationOfAd {
    String nameOfTheCounty;
    String nameOfTheCity;
    Double latitude;
    Double longitude;
}
