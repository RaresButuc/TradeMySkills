package com.trademyskills.service.repository;

import com.trademyskills.model.Ad;
import com.trademyskills.model.TypeOfAd;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TypeOfAdRepository extends JpaRepository<TypeOfAd, Long> {
    TypeOfAd findAllByNameOfCategory(String name);
}
