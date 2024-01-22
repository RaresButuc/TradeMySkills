package com.trademyskills.service.repository;

import com.trademyskills.model.Ad;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdRepository extends JpaRepository<Ad, Long> {
    Page<Ad> findAllByOrderByTitleAsc(Pageable pageable);

    Page<Ad> findAllByOrderByTitleDesc(Pageable pageable);

    Page<Ad> findAllByOrderByPriceAsc(Pageable pageable);

    Page<Ad> findAllByOrderByPriceDesc(Pageable pageable);

    Page<Ad> findByTypeOfAdNameOfCategory(String category,Pageable pageable);

    Page<Ad> findByTypeOfAdNameOfCategoryOrderByTitleAsc(String category,Pageable pageable);

    Page<Ad> findByTypeOfAdNameOfCategoryOrderByTitleDesc(String category,Pageable pageable);

    Page<Ad> findByTypeOfAdNameOfCategoryOrderByPriceAsc(String category,Pageable pageable);

    Page<Ad> findByTypeOfAdNameOfCategoryOrderByPriceDesc(String category,Pageable pageable);

    Page<Ad> findAllByTitleContainingIgnoreCase(String input,Pageable pageable);

    Page<Ad> findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCase(String category, String input,Pageable pageable);

    Page<Ad> findAllByTitleContainingIgnoreCaseOrderByTitleAsc(String input,Pageable pageable);

    Page<Ad> findAllByTitleContainingIgnoreCaseOrderByTitleDesc(String input,Pageable pageable);

    Page<Ad> findAllByTitleContainingIgnoreCaseOrderByPriceAsc(String input,Pageable pageable);

    Page<Ad> findAllByTitleContainingIgnoreCaseOrderByPriceDesc(String input,Pageable pageable);

    Page<Ad> findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCaseOrderByTitleAsc(String category, String input,Pageable pageable);

    Page<Ad> findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCaseOrderByTitleDesc(String category, String input,Pageable pageable);

    Page<Ad> findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCaseOrderByPriceAsc(String category, String input,Pageable pageable);

    Page<Ad> findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCaseOrderByPriceDesc(String category, String input,Pageable pageable);

}
