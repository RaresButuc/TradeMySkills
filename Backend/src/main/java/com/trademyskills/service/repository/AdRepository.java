package com.trademyskills.service.repository;

import com.trademyskills.enums.StatusOfAd;
import com.trademyskills.model.Ad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.trademyskills.model.User;
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

    List<Ad> findAllByTypeOfAdNameOfCategoryAndNameContainingIgnoreCase(String category, String input);

    List<Ad> findAllByNameContainingIgnoreCaseOrderByNameAsc(String input);

    List<Ad> findAllByNameContainingIgnoreCaseOrderByNameDesc(String input);

    List<Ad> findAllByNameContainingIgnoreCaseOrderByPriceAsc(String input);

    List<Ad> findAllByNameContainingIgnoreCaseOrderByPriceDesc(String input);

    List<Ad> findAllByTypeOfAdNameOfCategoryAndNameContainingIgnoreCaseOrderByNameAsc(String category, String input);

    List<Ad> findAllByTypeOfAdNameOfCategoryAndNameContainingIgnoreCaseOrderByNameDesc(String category, String input);

    List<Ad> findAllByTypeOfAdNameOfCategoryAndNameContainingIgnoreCaseOrderByPriceAsc(String category, String input);

    List<Ad> findAllByTypeOfAdNameOfCategoryAndNameContainingIgnoreCaseOrderByPriceDesc(String category, String input);

//    List<Ad> findAllByStatusOfAd(User user, StatusOfAd statusOfAd);
}
