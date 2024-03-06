package com.trademyskills.controller;

import com.trademyskills.model.Ad;
import com.trademyskills.model.User;
import com.trademyskills.service.AdService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ads")
@RequiredArgsConstructor
public class AdController {
    private final AdService adService;


    @GetMapping
    public Page<Ad> getAllAds(@RequestParam(name = "category", required = false) String typeofcategory, @RequestParam(name = "sort", required = false) String typeOfSort, @RequestParam(name = "input", required = false) String input, @RequestParam(name = "currentpage") int currentPage, @RequestParam(name = "itemsperpage") int itemsPerPage) {
        return adService.getAllAdsByCategFilterOrInput(typeofcategory, typeOfSort, input, currentPage, itemsPerPage);
    }

    @PostMapping("/post")
    public ResponseEntity<String> addAd(@RequestBody Ad ad) {
        adService.addAd(ad);
        return ResponseEntity.ok("Ad `"+ad.getTitle()+"` was successfully posted!");
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
    public ResponseEntity<String> updateAdById(@PathVariable("id") Long id, @RequestBody Ad updatedAd) {
        adService.updateAdById(id, updatedAd);
        return ResponseEntity.ok("Ad `"+ updatedAd.getTitle()+"` was successfully updated!");
    }

    @PutMapping("/{setStatus}/{id}")
    public ResponseEntity<String> updateAdAs(@PathVariable("id") Long id, @PathVariable("setStatus") String status) throws MessagingException {
        adService.setStatusOfAd(id, status);
        return ResponseEntity.ok("Tha status of ad was successfully updated!");
    }

    @PutMapping("/{typeOfAction}/{id}/{nameOfWorker}")
    public ResponseEntity<String> deleteOrAddWorker(@PathVariable("typeOfAction") String typeOfAction, @PathVariable("id") Long id, @PathVariable("nameOfWorker") String nameOfWorker) {
        adService.addOrDeleteWorker(nameOfWorker, id, typeOfAction);

        return ResponseEntity.ok("Success!");
    }

    @PutMapping("/rejected/remove/{id}/{nameOfWorker}")
    public ResponseEntity<String> deleteOrAddWorker(@PathVariable("id") Long id, @PathVariable("nameOfWorker") String nameOfWorker) {
        adService.deleteWorkerFromRejected(nameOfWorker, id);
        return ResponseEntity.ok("Success!");
    }

    @GetMapping("/rejected/{id}/{nameOfWorker}")
    public boolean isWorkerRejected(@PathVariable("id") Long id, @PathVariable("nameOfWorker") String nameOfWorker) {
        return adService.isThereAWorkerInsideRejectAd(nameOfWorker, id);
    }

    @GetMapping("/rejected/workers/{id}")
    public List<User> isWorkerRejected(@PathVariable("id") Long id) {
        return adService.getRejectedWorkers(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAdById(@PathVariable("id") Long id) {
        adService.deleteAdById(id);
        return ResponseEntity.ok("Successfully delete ad!");
    }

}
