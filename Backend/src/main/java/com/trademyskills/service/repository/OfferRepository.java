package com.trademyskills.service.repository;

import com.trademyskills.model.Offer;
import com.trademyskills.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepository extends JpaRepository <Offer,Long> {
}
