package com.trademyskills.controller;

import com.trademyskills.model.Rating;
import com.trademyskills.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ratings")
public class RatingController {
    private final RatingService ratingService;



    @GetMapping
    public List<Rating> getAllRatings() {
        return ratingService.getAllRatings();
    }

    @PostMapping
    public void addRating(@RequestBody Rating rating) {
        ratingService.addRating(rating);
    }

    @GetMapping("/{id}")
    public Rating getRatingById(@PathVariable("id") Long id) {
        return ratingService.getRatingById(id);
    }

    @GetMapping("/{from}/{to}")
    public boolean isAlreadyRated(@PathVariable("from") Long from, @PathVariable("to") Long to) {
        return ratingService.verifyAlreadyRated(from, to);
    }

    @PutMapping("/{id}")
    public void updateRatingById(@PathVariable("id") Long id, @RequestBody Rating updatedRating) {
        ratingService.updateRatingById(id, updatedRating);
    }

    @DeleteMapping("/{id}")
    public void deleteRatingById(@PathVariable("id") Long id) {
        ratingService.deleteRatingById(id);
    }

}
