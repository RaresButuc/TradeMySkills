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
    public Page<Ad> getAllAds(@RequestParam(name = "category", required = false) String typeofcategory,
                              @RequestParam(name = "sort", required = false) String typeOfSort,
                              @RequestParam(name = "input", required = false) String input,
                              @RequestParam(name = "currentpage") int currentPage,
                              @RequestParam(name = "itemsperpage") int itemsPerPage) {
        return adService.getAllAdsByCategFilterOrInput(typeofcategory, typeOfSort, input, currentPage, itemsPerPage);
    }

    @PostMapping("/post")
    public Long addAd(@RequestBody Ad ad) {
        return adService.addAd(ad);
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

        return ResponseEntity.ok("Ad `" + updatedAd.getTitle() + "` Was Successfully Updated!");
    }

    @PutMapping("/{setStatus}/{id}")
    public ResponseEntity<String> updateAdAs(@PathVariable("id") Long id, @PathVariable("setStatus") String status) throws MessagingException {
        adService.setStatusOfAd(id, status);

        return ResponseEntity.ok("Tha Status Of The Ad Was Successfully Updated!");
    }

    @PutMapping("/{typeOfAction}/{id}/{idOfWorker}")
    public ResponseEntity<String> deleteOrAddWorker(@PathVariable("typeOfAction") String typeOfAction, @PathVariable("id") Long id, @PathVariable("idOfWorker") Long idOfWorker) {
      String nameOfWorker =  adService.addOrDeleteWorker(idOfWorker, id, typeOfAction);

        String message = typeOfAction.equals("add") ?
                "Congratulations! " + nameOfWorker + " Was Successfully Set As A Worker For Your Ad!" :
                nameOfWorker + " Is Not A Worker For This Ad Anymore!";

        return ResponseEntity.ok(message);
    }

    @PutMapping("/rejected/remove/{id}/{idOfUser}")
    public ResponseEntity<String> deleteWorkerRejectedStatus(@PathVariable("id") Long id, @PathVariable("idOfUser") Long idOfUser) {
       String nameOfWorker =  adService.deleteWorkerFromRejected(idOfUser, id);

        return ResponseEntity.ok(nameOfWorker + "'s `Rejected` Status Was Removed!");
    }

    @GetMapping("/rejected/{id}/{idOfUser}")
    public boolean isWorkerRejected(@PathVariable("id") Long id, @PathVariable("idOfUser") Long idOfUser) {
        return adService.isThereAWorkerInsideRejectAd(idOfUser, id);
    }

    @GetMapping("/rejected/workers/{id}")
    public List<User> isWorkerRejected(@PathVariable("id") Long id) {
        return adService.getRejectedWorkers(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAdById(@PathVariable("id") Long id) {
        adService.deleteAdById(id);

        return ResponseEntity.ok("Ad #" + id + " Was Successfully Deleted!");
    }

}
