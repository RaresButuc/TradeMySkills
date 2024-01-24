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

    public List<Ad> getAllAds() {
        return adRepository.findAll();
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

    public Page<Ad> getAllAdsByCategFilterOrInput(String typeofcategory, String typeOfSort, String input, int currentPage, int itemsPerPage) {
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        List<Ad> filteredAds;

        if (typeofcategory.equals("null")) {
            if (typeOfSort.equals("null")) {
                if (input.equals("null")) {
                    filteredAds = getActiveAds(getAllAds());
                } else {
                    filteredAds = getActiveAds(search(input));
                }
            } else {
                if (input.equals("null")) {
                    filteredAds = getActiveAds(orderAllBy(typeOfSort));
                } else {
                    filteredAds = getActiveAds(getAllByInputOrdered(input, typeOfSort));
                }
            }
        } else {
            if (typeOfSort.equals("null")) {
                if (input.equals("null")) {
                    filteredAds = getActiveAds(findAdsByTypeOfAd(typeofcategory));
                } else {
                    filteredAds = getActiveAds(searchByTitleAndCategory(typeofcategory, input));
                }
            } else {
                if (input.equals("null")) {
                    filteredAds = getActiveAds(getAllByCategoryOrdered(typeofcategory, typeOfSort));
                } else {
                    filteredAds = getActiveAds(getAllByInputAndCategoryOrdered(input, typeofcategory, typeOfSort));
                }
            }
        }
        System.out.println(pageRequest.getOffset());
        List<Ad> sublist = filteredAds.subList(
                (int) pageRequest.getOffset(),
                Math.min((int) pageRequest.getOffset() + pageRequest.getPageSize(), filteredAds.size())
        );

        return new PageImpl<>(sublist, pageRequest, filteredAds.size());
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

    public List<Ad> getActiveAds(List<Ad> adsList) {
        return adsList.stream()
                .filter(e -> e.getStatusOfAd() == StatusOfAd.ACTIVE)
                .toList();
    }

    public List<User> getRejectedWorkers(Long id) {
        return getAdById(id).getRejectedWorkers();
    }

}
