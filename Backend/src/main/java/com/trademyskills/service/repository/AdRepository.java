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

    List<Ad> findByTypeOfAdNameOfCategory(String name);

    List<Ad> findByTypeOfAdNameOfCategoryOrderByNameAsc(String name);
    List<Ad> findByTypeOfAdNameOfCategoryOrderByNameDesc(String name);
    List<Ad> findByTypeOfAdNameOfCategoryOrderByPriceAsc(String name);
    List<Ad> findByTypeOfAdNameOfCategoryOrderByPriceDesc(String name);
}
