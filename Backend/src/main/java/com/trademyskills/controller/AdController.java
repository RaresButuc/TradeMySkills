package com.trademyskills.controller;

import com.trademyskills.model.Ad;
import com.trademyskills.service.AdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ads")
public class AdController {
    private final AdService adService;

    @Autowired
    public AdController(AdService adService) {
        this.adService = adService;
    }

    @GetMapping
    public List<Ad> getAllAds() {
        return adService.getAllAds();
    }

    @GetMapping("/category/{typeofcategory}")
    public List<Ad> getAllAdsByCategory(@PathVariable("typeofcategory") String name){
      return adService.findAdsByTypeOfAd(name);
    }

    @GetMapping("/order/name-asc")
    public List<Ad> orderByNameAsc(){
        return adService.orderByNameAsc();
    }
    @GetMapping("/order/name-desc")
    public List<Ad> orderByNameDesc(){
        return adService.orderByNameDesc();
    }
    @GetMapping("/order/price-asc")
    public List<Ad> orderByPriceAsc(){
        return adService.orderByPriceAsc();
    }
    @GetMapping("/order/price-desc")
    public List<Ad> orderByPriceDesc(){
        return adService.orderByPriceDesc();
    }
    @PostMapping
    public void addAd(@RequestBody Ad ad) {
        adService.addAd(ad);
    }

    @GetMapping("/{id}")
    public Ad getAdById(@PathVariable("id") Long id) {
        return adService.getAdById(id);
    }

    @PutMapping("/{id}")
    public void updateAdById(@PathVariable("id") Long id, @RequestBody Ad updatedAd) {
        adService.updateAdById(id, updatedAd);
    }

    @DeleteMapping("/{id}")
    public void deleteAdById(@PathVariable("id") Long id) {
        adService.deleteAdById(id);
    }

}
