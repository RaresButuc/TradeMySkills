package com.trademyskills.controller;

import com.trademyskills.model.Offer;
import com.trademyskills.model.User;
import com.trademyskills.service.OfferService;
import com.trademyskills.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/offers")
public class OfferController {
private OfferService offerService;
@Autowired
    public OfferController(OfferService offerService) {
        this.offerService = offerService;
    }

    @GetMapping
    public List<Offer> getAllOffer(){
        return offerService.getAllOffers();
    }

    @PostMapping
    public void addOffer(@RequestBody Offer offer){
        offerService.addOffer(offer);
    }

    @GetMapping("/{id}")
    public Offer getOfferById(@PathVariable("id") Long id){
        return offerService.getOfferById(id);
    }

    @PutMapping("/{id}")
    public void updateOfferById(@PathVariable("id") Long id, @RequestBody Offer updatedOffer){
        offerService.updateOfferById(id, updatedOffer);
    }

    @DeleteMapping("/{id}")
    public void deleteOfferById(@PathVariable("id") Long id){
        offerService.deleteOfferById(id);
    }

}
