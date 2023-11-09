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
        return adService.getAllAdsByCategFilterOrInput(typeofcategory, typeOfSort, input);
    }

    @PostMapping
    public void addAd(@RequestBody Ad ad) {
        adService.addAd(ad);
    }

    @GetMapping("/{id}")
    public Ad getAdById(@PathVariable("id") Long id) {
        return adService.getAdById(id);
    }

    @GetMapping("/profile/{id}/{status}")
    public List<Ad> getAllAdsOfUserByStatus(@PathVariable("id") Long id, @PathVariable("status") String status) {
        return adService.searchAllAdsByUserAndStatus(id, status);
    }

    @PutMapping("/{id}")
    public void updateAdById(@PathVariable("id") Long id, @RequestBody Ad updatedAd) {
        adService.updateAdById(id, updatedAd);
    }

    //    @PutMapping("/{setStatus}/{id}")
//    public void updateAdAs(@PathVariable("id") Long id, @PathVariable("setStatus") String status){
//        adService.setStatusOfAd(id,status);
//    }
    @PutMapping("/add/{id}/{nameOfWorker}")
    public void addWorkerToAd(@PathVariable("id") Long id, @PathVariable("nameOfWorker") String nameOfWorker) {
        adService.addWorkerToAd(nameOfWorker, id);
    }


    @DeleteMapping("/{id}")
    public void deleteAdById(@PathVariable("id") Long id) {
        adService.deleteAdById(id);
    }

}
