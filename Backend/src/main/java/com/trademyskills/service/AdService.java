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

    public List<Ad> orderAllBy(String typeOfSort){
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
//    public List<Ad> orderByNameAsc(){
//        return adRepository.findAllByOrderByNameAsc();
//    }
//
//    public List<Ad> orderByNameDesc(){
//        return adRepository.findAllByOrderByNameDesc();
//    }
//
//    public List<Ad> orderByPriceAsc(){
//        return adRepository.findAllByOrderByPriceAsc();
//    }
//
//    public List<Ad> orderByPriceDesc(){
//        return adRepository.findAllByOrderByPriceDesc();
//    }

//    public List<Ad> getAllByCategoryOrderAscByName(String name){
//        return adRepository.findByTypeOfAdNameOfCategoryOrderByNameAsc(name);
//    }
//    public List<Ad> getAllByCategoryOrderDescByName(String name){
//        return adRepository.findByTypeOfAdNameOfCategoryOrderByNameDesc(name);
//    }
//    public List<Ad> getAllByCategoryOrderAscByPrice(String name){
//        return adRepository.findByTypeOfAdNameOfCategoryOrderByPriceAsc(name);
//    }
//    public List<Ad> getAllByCategoryOrderDescByPrice(String name){
//        return adRepository.findByTypeOfAdNameOfCategoryOrderByPriceDesc(name);
//    }
    public List<Ad> getAllByCategoryOrdered(String name, String typeOfSort){
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
}
