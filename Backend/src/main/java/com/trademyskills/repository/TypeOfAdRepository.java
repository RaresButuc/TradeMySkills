package com.trademyskills.repository;

import com.trademyskills.model.TypeOfAd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeOfAdRepository extends JpaRepository<TypeOfAd, Long> {
}
