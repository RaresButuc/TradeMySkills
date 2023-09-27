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
    public List<Ad> getAllAds(@RequestParam(name = "category", required = false) String typeofcategory, @RequestParam(name = "sort", required = false) String typeOfSort, @RequestParam(name = "input", required = false) String input) {
        if (typeofcategory.equals("null")) {
            if (typeOfSort.equals("null")) {
                if (input.equals("null")) {
                    return adService.getAllAds();
                } else {
                    return adService.search(input);
                }
            } else {
                if (input.equals("null")) {
                    return adService.orderAllBy(typeOfSort);
                } else {
                    return adService.getAllByInputOrdered(input, typeOfSort);
                }
            }
        } else {
            if (typeOfSort.equals("null")) {
                if (input.equals("null")) {
                    return adService.findAdsByTypeOfAd(typeofcategory);
                } else {
                    return adService.searchByNameAndCategory(typeofcategory, input);
                }
            } else {
                if (input.equals("null")) {
                    return adService.getAllByCategoryOrdered(typeofcategory, typeOfSort);
                } else {
                    return adService.getAllByInputAndCategoryOrdered(input, typeofcategory, typeOfSort);
                }
            }
        }
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
