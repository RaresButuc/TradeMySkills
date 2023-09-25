package com.trademyskills.service.repository;

import com.trademyskills.model.TypeOfAd;
import com.trademyskills.model.Ad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdRepository extends JpaRepository<Ad, Long> {

//    List<Ad> findAllByTypeOfAd(TypeOfAd typeOfAd);
}
