package com.trademyskills.service;

import com.trademyskills.enums.StatusOfAd;
import com.trademyskills.model.Ad;
import com.trademyskills.model.User;
import com.trademyskills.service.repository.AdRepository;
import com.trademyskills.service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdService {
    private final AdRepository adRepository;
    private final UserRepository userRepository;

    @Autowired
    public AdService(AdRepository adRepository, UserRepository userRepository) {
        this.adRepository = adRepository;
        this.userRepository = userRepository;
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

    public List<Ad> getAllAdsByCategFilterOrInput(String typeofcategory, String typeOfSort, String input) {
        if (typeofcategory.equals("null")) {
            if (typeOfSort.equals("null")) {
                if (input.equals("null")) {
                    return getActiveAds(getAllAds());
                } else {
                    return getActiveAds(search(input));
                }
            } else {
                if (input.equals("null")) {
                    return getActiveAds(orderAllBy(typeOfSort));
                } else {
                    return getActiveAds(getAllByInputOrdered(input, typeOfSort));
                }
            }
        } else {
            if (typeOfSort.equals("null")) {
                if (input.equals("null")) {
                    return getActiveAds(findAdsByTypeOfAd(typeofcategory));
                } else {
                    return getActiveAds(searchByNameAndCategory(typeofcategory, input));
                }
            } else {
                if (input.equals("null")) {
                    return getActiveAds(getAllByCategoryOrdered(typeofcategory, typeOfSort));
                } else {
                    return getActiveAds(getAllByInputAndCategoryOrdered(input, typeofcategory, typeOfSort));
                }
            }
        }
    }

    public void setStatusOfAd(Long id, String stringStatusOfAd) {
        Ad adFormDb = adRepository.findById(id).orElse(null);
        assert adFormDb != null;
        adFormDb.setStatusOfAd(StatusOfAd.getByName(stringStatusOfAd));

        adRepository.save(adFormDb);
    }


    public void updateAdById(Long id, Ad adUpdater) {
        Ad adFromDb = adRepository.findById(id).orElse(null);
        assert adFromDb != null;
        adFromDb.setName(adUpdater.getName());
//        adFromDb.setStatusOfAd(adUpdater.getStatusOfAd());
        adFromDb.setStatusOfAd(adFromDb.getStatusOfAd());
        adFromDb.setDescription(adUpdater.getDescription());
        adFromDb.setPrice(adUpdater.getPrice());
        adRepository.save(adFromDb);
    }

    public void deleteAdById(Long id) {
        adRepository.deleteById(id);
    }

    public List<Ad> searchAllAdsByUserAndStatus(Long id, String stringStatusOfAd) {
        User user = userRepository.findById(id).orElse(null);
        StatusOfAd statusOfAd = StatusOfAd.getByName(stringStatusOfAd);
        assert user != null;
        return user.getAds().stream().filter(e -> e.getStatusOfAd() == statusOfAd).toList();
    }

    public List<Ad> getActiveAds(List<Ad> adsList) {
        return adsList.stream().filter(e -> e.getStatusOfAd() == StatusOfAd.ACTIVE).toList();
    }

}
