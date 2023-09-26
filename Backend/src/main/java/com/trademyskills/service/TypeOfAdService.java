package com.trademyskills.service;

import com.trademyskills.model.Ad;
import com.trademyskills.model.TypeOfAd;
import com.trademyskills.service.repository.TypeOfAdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeOfAdService {
    private final TypeOfAdRepository typeOfAdRepository;

    @Autowired
    public TypeOfAdService(TypeOfAdRepository typeOfAdRepository) {
        this.typeOfAdRepository = typeOfAdRepository;
    }

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
