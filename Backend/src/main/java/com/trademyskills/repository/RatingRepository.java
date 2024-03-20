package com.trademyskills.repository;

import com.trademyskills.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
 List<Rating> findAllByTo_Id(Long id);
}
