package com.trademyskills.service.repository;

import com.trademyskills.model.Ad;
import com.trademyskills.model.TypeOfAd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypeOfAdRepository extends JpaRepository<TypeOfAd, Long> {
    TypeOfAd findAllByNameOfCategory(String name);
}
