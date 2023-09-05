package com.trademyskills.controller;

import com.trademyskills.model.Offer;
import com.trademyskills.model.Rating;
import com.trademyskills.service.OfferService;
import com.trademyskills.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ratings")
public class RatingController {
private RatingService ratingService;
@Autowired
    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @GetMapping
    public List<Rating> getAllRatings(){
        return ratingService.getAllRatings();
    }

    @PostMapping
    public void addRating(@RequestBody Rating rating){
        ratingService.addRating(rating);
    }

    @GetMapping("/{id}")
    public Rating getRatingById(@PathVariable("id") Long id){
        return ratingService.getRatingById(id);
    }

    @PutMapping("/{id}")
    public void updateRatingById(@PathVariable("id") Long id, @RequestBody Rating updatedRating){
        ratingService.updateRatingById(id, updatedRating);
    }

    @DeleteMapping("/{id}")
    public void deleteRatingById(@PathVariable("id") Long id){
        ratingService.deleteRatingById(id);
    }

}
