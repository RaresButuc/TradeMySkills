package com.trademyskills.service;

import com.trademyskills.enums.StatusOfAd;
import com.trademyskills.model.Ad;
import com.trademyskills.service.repository.AdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class AdService {
    private final AdRepository adRepository;

    @Autowired
    public AdService(AdRepository adRepository) {
        this.adRepository = adRepository;
    }

    public List<Ad> getAllAds() {
        return adRepository.findAll();
    }

    public void addAd(Ad ad) {
        ad.setStatusOfAd(StatusOfAd.ACTIVE);
        adRepository.save(ad);
    }

    public Ad getAdById(Long id) {
        return adRepository.findById(id).orElse(null);
    }

    public List<Ad> findAdsByTypeOfAd(String name) {
        return adRepository.findByTypeOfAdNameOfCategory(name);
    }

    public void updateAdById(Long id, Ad adUpdater) {
        Ad adFromDb = adRepository.findById(id).orElse(null);
        assert adFromDb != null;
        adFromDb.setName(adUpdater.getName());
        adFromDb.setStatusOfAd(adUpdater.getStatusOfAd());
        adFromDb.setDescription(adUpdater.getDescription());
        adFromDb.setPrice(adUpdater.getPrice());
        adRepository.save(adFromDb);
    }

    public void deleteAdById(Long id) {
        adRepository.deleteById(id);
    }

    public List<Ad> orderAllBy(String typeOfSort) {
        switch (typeOfSort) {
            case "name-asc" -> {
                return adRepository.findAllByOrderByNameAsc();
            }
            case "name-desc" -> {
                return adRepository.findAllByOrderByNameDesc();
            }
            case "price-asc" -> {
                return adRepository.findAllByOrderByPriceAsc();
            }
            case "price-desc" -> {
                return adRepository.findAllByOrderByPriceDesc();
            }
            default -> {
                return null;
            }
        }
    }

    public List<Ad> getAllByCategoryOrdered(String name, String typeOfSort) {
        switch (typeOfSort) {
            case "name-asc" -> {
                return adRepository.findByTypeOfAdNameOfCategoryOrderByNameAsc(name);
            }
            case "name-desc" -> {
                return adRepository.findByTypeOfAdNameOfCategoryOrderByNameDesc(name);
            }
            case "price-asc" -> {
                return adRepository.findByTypeOfAdNameOfCategoryOrderByPriceAsc(name);
            }
            case "price-desc" -> {
                return adRepository.findByTypeOfAdNameOfCategoryOrderByPriceDesc(name);
            }
            default -> {
                return null;
            }
        }
    }

    public List<Ad> getAllByInputOrdered(String input, String typeOfSort) {
        switch (typeOfSort) {
            case "name-asc" -> {
                return adRepository.findAllByNameContainingIgnoreCaseOrderByNameAsc(input);
            }
            case "name-desc" -> {
                return adRepository.findAllByNameContainingIgnoreCaseOrderByNameDesc(input);
            }
            case "price-asc" -> {
                return adRepository.findAllByNameContainingIgnoreCaseOrderByPriceAsc(input);
            }
            case "price-desc" -> {
                return adRepository.findAllByNameContainingIgnoreCaseOrderByPriceDesc(input);
            }
            default -> {
                return null;
            }
        }
    }

    public List<Ad> getAllByInputAndCategoryOrdered(String input, String category, String typeOfSort) {
        switch (typeOfSort) {
            case "name-asc" -> {
                return adRepository.findAllByTypeOfAdNameOfCategoryAndNameContainingIgnoreCaseOrderByNameAsc(category, input);
            }
            case "name-desc" -> {
                return adRepository.findAllByTypeOfAdNameOfCategoryAndNameContainingIgnoreCaseOrderByNameDesc(category, input);
            }
            case "price-asc" -> {
                return adRepository.findAllByTypeOfAdNameOfCategoryAndNameContainingIgnoreCaseOrderByPriceAsc(category, input);
            }
            case "price-desc" -> {
                return adRepository.findAllByTypeOfAdNameOfCategoryAndNameContainingIgnoreCaseOrderByPriceDesc(category, input);
            }
            default -> {
                return null;
            }
        }
    }

    public List<Ad> search(String input) {
        return adRepository.findAllByNameContainingIgnoreCase(input);
    }

    public List<Ad> searchByNameAndCategory(String category, String input) {
        return adRepository.findAllByTypeOfAdNameOfCategoryAndNameContainingIgnoreCase(category, input);
    }
}
