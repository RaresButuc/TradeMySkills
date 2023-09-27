package com.trademyskills.service.repository;

import com.trademyskills.model.Ad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdRepository extends JpaRepository<Ad, Long> {
    List<Ad> findAllByOrderByNameAsc();
    List<Ad> findAllByOrderByNameDesc();

    List<Ad> findAllByOrderByPriceAsc();
    List<Ad> findAllByOrderByPriceDesc();

    List<Ad> findByTypeOfAdNameOfCategory(String category);

    List<Ad> findByTypeOfAdNameOfCategoryOrderByNameAsc(String category);
    List<Ad> findByTypeOfAdNameOfCategoryOrderByNameDesc(String category);
    List<Ad> findByTypeOfAdNameOfCategoryOrderByPriceAsc(String category);
    List<Ad> findByTypeOfAdNameOfCategoryOrderByPriceDesc(String category);

    List<Ad> findAllByNameContainingIgnoreCase(String input);
    List<Ad> findAllByTypeOfAdNameOfCategoryAndNameContainingIgnoreCase(String category,String input);
}
