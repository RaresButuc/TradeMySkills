package com.trademyskills.service;


import com.trademyskills.model.TypeOfAd;
import com.trademyskills.repository.TypeOfAdRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@RequiredArgsConstructor
@Service
public class TypeOfAdService {
    private final TypeOfAdRepository typeOfAdRepository;



    public List<TypeOfAd> getAllTypesOfAds() {
        return typeOfAdRepository.findAll();
    }

    public void addCategory(TypeOfAd typeOfAd) {
        typeOfAdRepository.save(typeOfAd);
    }


    public void deleteTypeOfAdById(Long id) {
        typeOfAdRepository.deleteById(id);
    }

}
