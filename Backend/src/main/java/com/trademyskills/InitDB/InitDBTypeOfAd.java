package com.trademyskills.InitDB;

import com.trademyskills.model.TypeOfAd;
import com.trademyskills.repository.TypeOfAdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InitDBTypeOfAd {
    private final TypeOfAdRepository typeOfAdRepository;

    @Autowired
    public InitDBTypeOfAd(TypeOfAdRepository typeOfAdRepository) {
        this.typeOfAdRepository = typeOfAdRepository;
    }

    public void seedDB() {
        TypeOfAd constructions = TypeOfAd.builder().nameOfCategory("constructions").build();
        TypeOfAd confections = TypeOfAd.builder().nameOfCategory("confections").build();
        TypeOfAd cooking = TypeOfAd.builder().nameOfCategory("cooking").build();
        TypeOfAd deliveries = TypeOfAd.builder().nameOfCategory("deliveries").build();
        TypeOfAd events = TypeOfAd.builder().nameOfCategory("events").build();
        TypeOfAd education = TypeOfAd.builder().nameOfCategory("education").build();
        TypeOfAd cleaning = TypeOfAd.builder().nameOfCategory("cleaning").build();
        TypeOfAd petcare = TypeOfAd.builder().nameOfCategory("petcare").build();
        TypeOfAd babysitting = TypeOfAd.builder().nameOfCategory("babysitting").build();
        TypeOfAd other = TypeOfAd.builder().nameOfCategory("other").build();

        typeOfAdRepository.saveAllAndFlush(List.of(constructions, confections, cooking, deliveries, events, education, cleaning, petcare, babysitting, other));
    }
}
