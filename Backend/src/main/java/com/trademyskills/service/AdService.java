package com.trademyskills.service;

import com.trademyskills.enums.Role;
import com.trademyskills.enums.StatusOfAd;
import com.trademyskills.model.Ad;
import com.trademyskills.model.User;
import com.trademyskills.service.repository.AdRepository;
import com.trademyskills.service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdService {
    private final MailService mailService;
    private final AdRepository adRepository;
    private final UserRepository userRepository;

    @Autowired
    public AdService(MailService mailService, AdRepository adRepository, UserRepository userRepository) {
        this.mailService = mailService;
        this.adRepository = adRepository;
        this.userRepository = userRepository;
    }

    public Page<Ad> getAllAds(int currentPage, int itemsPerPage) {
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return adRepository.findAll(pageRequest);
    }

    public void addAd(Ad ad) {
        ad.setStatusOfAd(StatusOfAd.ACTIVE);
        adRepository.save(ad);
    }


    public void addOrDeleteWorker(String name, Long idOfAd, String typeOfAction) {
        User workerUser = userRepository.findByName(name).orElse(null);
        Ad currentAd = adRepository.findById(idOfAd).orElse(null);

        assert workerUser != null;
        assert currentAd != null;

        if (workerUser.getRole() == Role.ROLE_WORKER) {


            switch (typeOfAction) {
                case "add" -> {
                    currentAd.setWorker(workerUser);
                    currentAd.setStatusOfAd(StatusOfAd.PENDING);
                }
                case "delete" -> {
                    currentAd.setWorker(null);
                    currentAd.setStatusOfAd(StatusOfAd.ACTIVE);
                    if (!isThereAWorkerInsideRejectAd(name, idOfAd)) {
                        currentAd.getRejectedWorkers().add(workerUser);
                    }
                }
            }
            adRepository.save(currentAd);
        }
    }

    public boolean isThereAWorkerInsideRejectAd(String name, Long idOfAd) {
        User workerUser = userRepository.findByName(name).orElse(null);
        Ad currentAd = adRepository.findById(idOfAd).orElse(null);

        assert workerUser != null;
        assert currentAd != null;

        return currentAd.getRejectedWorkers().contains(workerUser);
    }


    public void deleteWorkerFromRejected(String name, Long idOfAd) {
        User workerUser = userRepository.findByName(name).orElse(null);
        Ad currentAd = adRepository.findById(idOfAd).orElse(null);

        assert currentAd != null;
        currentAd.getRejectedWorkers().remove(workerUser);
        adRepository.save(currentAd);
    }

    public Ad getAdById(Long id) {
        return adRepository.findById(id).orElse(null);
    }

    public Page<Ad> findAdsByTypeOfAd(String title, int currentPage, int itemsPerPage) {
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return adRepository.findByTypeOfAdNameOfCategory(title, pageRequest);
    }

    public Page<Ad> orderAllBy(String typeOfSort, int currentPage, int itemsPerPage) {
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);

        switch (typeOfSort) {
            case "title-asc" -> {
                return adRepository.findAllByOrderByTitleAsc(pageRequest);
            }
            case "title-desc" -> {
                return adRepository.findAllByOrderByTitleDesc(pageRequest);
            }
            case "price-asc" -> {
                return adRepository.findAllByOrderByPriceAsc(pageRequest);
            }
            case "price-desc" -> {
                return adRepository.findAllByOrderByPriceDesc(pageRequest);
            }
            default -> {
                return null;
            }
        }
    }

    public Page<Ad> getAllByCategoryOrdered(String title, String typeOfSort, int currentPage, int itemsPerPage) {
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);

        switch (typeOfSort) {
            case "title-asc" -> {
                return adRepository.findByTypeOfAdNameOfCategoryOrderByTitleAsc(title, pageRequest);
            }
            case "title-desc" -> {
                return adRepository.findByTypeOfAdNameOfCategoryOrderByTitleDesc(title, pageRequest);
            }
            case "price-asc" -> {
                return adRepository.findByTypeOfAdNameOfCategoryOrderByPriceAsc(title, pageRequest);
            }
            case "price-desc" -> {
                return adRepository.findByTypeOfAdNameOfCategoryOrderByPriceDesc(title, pageRequest);
            }
            default -> {
                return null;
            }
        }
    }

    public Page<Ad> getAllByInputOrdered(String input, String typeOfSort, int currentPage, int itemsPerPage) {
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);

        switch (typeOfSort) {
            case "title-asc" -> {
                return adRepository.findAllByTitleContainingIgnoreCaseOrderByTitleAsc(input, pageRequest);
            }
            case "title-desc" -> {
                return adRepository.findAllByTitleContainingIgnoreCaseOrderByTitleDesc(input, pageRequest);
            }
            case "price-asc" -> {
                return adRepository.findAllByTitleContainingIgnoreCaseOrderByPriceAsc(input, pageRequest);
            }
            case "price-desc" -> {
                return adRepository.findAllByTitleContainingIgnoreCaseOrderByPriceDesc(input, pageRequest);
            }
            default -> {
                return null;
            }
        }
    }

    public Page<Ad> getAllByInputAndCategoryOrdered(String input, String category, String typeOfSort, int currentPage, int itemsPerPage) {
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);

        switch (typeOfSort) {
            case "title-asc" -> {
                return adRepository.findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCaseOrderByTitleAsc(category, input, pageRequest);
            }
            case "title-desc" -> {
                return adRepository.findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCaseOrderByTitleDesc(category, input, pageRequest);
            }
            case "price-asc" -> {
                return adRepository.findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCaseOrderByPriceAsc(category, input, pageRequest);
            }
            case "price-desc" -> {
                return adRepository.findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCaseOrderByPriceDesc(category, input, pageRequest);
            }
            default -> {
                return null;
            }
        }
    }

    public Page<Ad> search(String input, int currentPage, int itemsPerPage) {
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);

        return adRepository.findAllByTitleContainingIgnoreCase(input, pageRequest);
    }

    public Page<Ad> searchByTitleAndCategory(String category, String input, int currentPage, int itemsPerPage) {
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);

        return adRepository.findAllByTypeOfAdNameOfCategoryAndTitleContainingIgnoreCase(category, input, pageRequest);
    }

    public Page<Ad> getAllAdsByCategFilterOrInput(String typeofcategory, String typeOfSort, String input, int currentPage, int itemsPerPage) {
        if (typeofcategory.equals("null")) {
            if (typeOfSort.equals("null")) {
                if (input.equals("null")) {
                    return getActiveAds(getAllAds(currentPage, itemsPerPage));
                } else {
                    return getActiveAds(search(input, currentPage, itemsPerPage));
                }
            } else {
                if (input.equals("null")) {
                    return getActiveAds(orderAllBy(typeOfSort, currentPage, itemsPerPage));
                } else {
                    return getActiveAds(getAllByInputOrdered(input, typeOfSort, currentPage, itemsPerPage));
                }
            }
        } else {
            if (typeOfSort.equals("null")) {
                if (input.equals("null")) {
                    return getActiveAds(findAdsByTypeOfAd(typeofcategory, currentPage, itemsPerPage));
                } else {
                    return getActiveAds(searchByTitleAndCategory(typeofcategory, input, currentPage, itemsPerPage));
                }
            } else {
                if (input.equals("null")) {
                    return getActiveAds(getAllByCategoryOrdered(typeofcategory, typeOfSort, currentPage, itemsPerPage));
                } else {
                    return getActiveAds(getAllByInputAndCategoryOrdered(input, typeofcategory, typeOfSort, currentPage, itemsPerPage));
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
        adFromDb.setStatusOfAd(adUpdater.getStatusOfAd());
        adFromDb.setTitle(adUpdater.getTitle());
        adFromDb.setDescription(adUpdater.getDescription());
        adFromDb.setPrice(adUpdater.getPrice());
        adFromDb.setLocation(adUpdater.getLocation());
        adFromDb.setTypeOfAd(adUpdater.getTypeOfAd());
        adRepository.save(adFromDb);
    }

    public void deleteAdById(Long id) {
        adRepository.deleteById(id);
    }

    public List<Ad> searchAllAdsByUserAndStatus(Long id, String stringStatusOfAd) {
        User user = userRepository.findById(id).orElse(null);
        StatusOfAd statusOfAd = StatusOfAd.getByName(stringStatusOfAd);
        assert user != null;

        if (user.getRole() == Role.ROLE_CUSTOMER) {
            return user.getAdsOwned().stream().filter(e -> e.getStatusOfAd() == statusOfAd).distinct().toList();
        } else if (user.getRole() == Role.ROLE_WORKER) {
            return user.getAdsAttends().stream().filter(e -> e.getStatusOfAd() == statusOfAd).distinct().toList();
        }
        return null;
    }

    public Page<Ad> getActiveAds(Page<Ad> adsList) {
        List<Ad> filteredAds = adsList.getContent().stream()
                .filter(e -> e.getStatusOfAd() == StatusOfAd.ACTIVE)
                .toList();

        return new PageImpl<>(filteredAds, adsList.getPageable(), filteredAds.size());
    }

    public List<User> getRejectedWorkers(Long id) {
        return getAdById(id).getRejectedWorkers();
    }
}
