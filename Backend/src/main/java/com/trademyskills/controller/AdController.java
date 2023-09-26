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
    @GetMapping("category/{typeofcategory}/{typeofsort}")
    public List<Ad> getAllByCategoryOrdered(@PathVariable("typeofcategory")String name,@PathVariable("typeofsort")String typeOfSort){
        return adService.getAllByCategoryOrdered(name,typeOfSort);
    }

//    @GetMapping("/order/{typeofsort}")
//    public List<Ad> getAllOrdered(@PathVariable("typeofsort")String typeOfSort){
//        return adService.orderAllBy(typeOfSort);
//    }

    @GetMapping("/order")
    public List<Ad> getAllOrdered(@RequestParam(name = "sort", required = false) String typeOfSort) {
        if (typeOfSort != null) {
            return adService.orderAllBy(typeOfSort);
        } else {
            return adService.getAllAds(); // Provide a default behavior when no sort parameter is provided
        }
    }
    @GetMapping("/search/{input}")
    public List<Ad> search(@PathVariable("input") String input){
        return adService.search(input);
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
