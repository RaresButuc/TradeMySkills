package com.trademyskills.service;

import com.trademyskills.enums.StatusOfAd;
import com.trademyskills.model.Ad;
import com.trademyskills.model.User;
import com.trademyskills.service.repository.AdRepository;
import com.trademyskills.service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public void addWorkerToAd(String name, Long idOfAd) {
        User workerUser = userRepository.findByName(name).orElse(null);
        Ad currentAd = adRepository.findById(idOfAd).orElse(null);

        assert workerUser != null;
        assert currentAd != null;

        List<User> currentUsersOfAd = new ArrayList<>(currentAd.getUsers());
        currentUsersOfAd.add(workerUser);

        currentAd.setUsers(currentUsersOfAd);
        adRepository.save(currentAd);

    }

    public Ad getAdById(Long id) {
        return adRepository.findById(id).orElse(null);
    }

    public List<Ad> findAdsByTypeOfAd(String title) {
        return adRepository.findByTypeOfAdNameOfCategory(title);
    }

    public List<Ad> orderAllBy(String typeOfSort) {
        switch (typeOfSort) {
            case "title-asc" -> {
                return adRepository.findAllByOrderByTitleAsc();
            }
            case "title-desc" -> {
                return adRepository.findAllByOrderByTitleDesc();
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

    public List<Ad> getAllByCategoryOrdered(String title, String typeOfSort) {
        switch (typeOfSort) {
            case "title-asc" -> {
                return adRepository.findByTypeOfAdNameOfCategoryOrderByTitleAsc(title);
            }
            case "title-desc" -> {
                return adRepository.findByTypeOfAdNameOfCategoryOrderByTitleDesc(title);
            }
            case "price-asc" -> {
                return adRepository.findByTypeOfAdNameOfCategoryOrderByPriceAsc(title);
            }
            case "price-desc" -> {
                return adRepository.findByTypeOfAdNameOfCategoryOrderByPriceDesc(title);
            }
            default -> {
                return null;
            }
        }
    }

    public List<Ad> getAllByInputOrdered(String input, String typeOfSort) {
        switch (typeOfSort) {
            case "title-asc" -> {
                return adRepository.findAllByTitleContainingIgnoreCaseOrderByTitleAsc(input);
            }
            case "title-desc" -> {
                return adRepository.findAllByTitleContainingIgnoreCaseOrderByTitleDesc(input);
            }
            case "price-asc" -> {
                return adRepository.findAllByTitleContainingIgnoreCaseOrderByPriceAsc(input);
            }
            case "price-desc" -> {
                return adRepository.findAllByTitleContainingIgnoreCaseOrderByPriceDesc(input);
            }
            default -> {
                return null;
            }
        }
    }

    public List<Ad> getAllByInputAndCategoryOrdered(String input, String category, String typeOfSort) {
        switch (typeOfSort) {
            case "title-asc" -> {
                return adRepository.findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCaseOrderByTitleAsc(category, input);
            }
            case "title-desc" -> {
                return adRepository.findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCaseOrderByTitleDesc(category, input);
            }
            case "price-asc" -> {
                return adRepository.findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCaseOrderByPriceAsc(category, input);
            }
            case "price-desc" -> {
                return adRepository.findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCaseOrderByPriceDesc(category, input);
            }
            default -> {
                return null;
            }
        }
    }

    public List<Ad> search(String input) {
        return adRepository.findAllByTitleContainingIgnoreCase(input);
    }

    public List<Ad> searchByTitleAndCategory(String category, String input) {
        return adRepository.findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCase(category, input);
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
                    return getActiveAds(searchByTitleAndCategory(typeofcategory, input));
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
        adFromDb.setTitle(adUpdater.getTitle());
        adFromDb.setStatusOfAd(adUpdater.getStatusOfAd());
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
