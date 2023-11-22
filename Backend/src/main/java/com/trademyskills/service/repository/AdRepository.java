package com.trademyskills.service.repository;

import com.trademyskills.enums.StatusOfAd;
import com.trademyskills.model.Ad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.trademyskills.model.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Repository
public interface AdRepository extends JpaRepository<Ad, Long> {
    List<Ad> findAllByOrderByTitleAsc();

    List<Ad> findAllByOrderByTitleDesc();

    List<Ad> findAllByOrderByPriceAsc();

    List<Ad> findAllByOrderByPriceDesc();

    List<Ad> findByTypeOfAdNameOfCategory(String category);

    List<Ad> findByTypeOfAdNameOfCategoryOrderByTitleAsc(String category);

    List<Ad> findByTypeOfAdNameOfCategoryOrderByTitleDesc(String category);

    List<Ad> findByTypeOfAdNameOfCategoryOrderByPriceAsc(String category);

    List<Ad> findByTypeOfAdNameOfCategoryOrderByPriceDesc(String category);

    List<Ad> findAllByTitleContainingIgnoreCase(String input);

    List<Ad> findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCase(String category, String input);

    List<Ad> findAllByTitleContainingIgnoreCaseOrderByTitleAsc(String input);

    List<Ad> findAllByTitleContainingIgnoreCaseOrderByTitleDesc(String input);

    List<Ad> findAllByTitleContainingIgnoreCaseOrderByPriceAsc(String input);

    List<Ad> findAllByTitleContainingIgnoreCaseOrderByPriceDesc(String input);

    List<Ad> findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCaseOrderByTitleAsc(String category, String input);

    List<Ad> findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCaseOrderByTitleDesc(String category, String input);

    List<Ad> findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCaseOrderByPriceAsc(String category, String input);

    List<Ad> findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCaseOrderByPriceDesc(String category, String input);


}
