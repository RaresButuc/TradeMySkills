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

    @GetMapping("category/{typeofcategory}")
    public List<Ad> getAllByCategoryOrdered(@RequestParam(name = "sort", required = false) String typeOfSort, @PathVariable("typeofcategory") String name) {
        if (typeOfSort.equals("null")) {
            return adService.findAdsByTypeOfAd(name); // Provide a default behavior when no sort parameter is provided
        } else {
            return adService.getAllByCategoryOrdered(name, typeOfSort);
        }
    }

    @GetMapping
    public List<Ad> getAllOrdered(@RequestParam(name = "sort", required = false) String typeOfSort) {
        if (typeOfSort.equals("null")) {
            return adService.getAllAds(); // Provide a default behavior when no sort parameter is provided
        } else {
            return adService.orderAllBy(typeOfSort);
        }
    }

    @GetMapping("/search")
    public List<Ad> searchByName(@RequestParam(name = "input", required = false) String input) {
        if(input.equals("null")) {
            return adService.getAllAds();
        }
        return adService.search(input);
    }

    @GetMapping("/search/{typeOfCategory}")
    public List<Ad> searchByNameAndCategory(@RequestParam(name = "input", required = false) String input, @PathVariable("typeOfCategory") String category) {
        if(input.equals("null")) {
            return adService.findAdsByTypeOfAd(category);
        }
        return adService.searchByNameAndCategory(category,input);
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
