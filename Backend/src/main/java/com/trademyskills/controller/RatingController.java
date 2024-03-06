package com.trademyskills.controller;

import com.trademyskills.model.Rating;
import com.trademyskills.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> addRating(@RequestBody Rating rating) {
        ratingService.addRating(rating);

        return ResponseEntity.ok("Your Rating Was Successfully Added!");
    }

    @GetMapping("/{id}")
    public Rating getRatingById(@PathVariable("id") Long id) {
        return ratingService.getRatingById(id);
    }

    @GetMapping("/{from}/{to}")
    public boolean isAlreadyRated(@PathVariable("from") Long from, @PathVariable("to") Long to) {
        return ratingService.verifyAlreadyRated(from, to);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRatingById(@PathVariable("id") Long id) {
        ratingService.deleteRatingById(id);

        return ResponseEntity.ok("Your Rating Was Successfully Deleted!");
    }

}
