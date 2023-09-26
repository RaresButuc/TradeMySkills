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
        return adRepository.findAll().stream().filter(e -> Objects.equals(e.getTypeOfAd().getNameOfCategory(), name)).toList();
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

    public List<Ad> orderByNameAsc(){
        return adRepository.findAllByOrderByPriceAsc();
    }

    public List<Ad> orderByNameDesc(){
        return adRepository.findAllByOrderByPriceDesc();
    }
}
