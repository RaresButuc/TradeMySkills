package com.trademyskills.service;

import com.trademyskills.model.Rating;
import com.trademyskills.service.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {
    private RatingRepository ratingRepository;

    @Autowired
    public RatingService(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }

    public void addRating(Rating rating) {
        ratingRepository.save(rating);
    }

    public Rating getRatingById(Long id) {
        return ratingRepository.findById(id).orElse(null);
    }

    public void updateRatingById(Long id, Rating ratingUpdater) {
        Rating ratingFromDb = ratingRepository.findById(id).orElse(null);
        ;
        assert ratingFromDb != null;
        ratingFromDb.setComment(ratingUpdater.getComment());
        ratingFromDb.setStar(ratingUpdater.getStar());
        ratingRepository.save(ratingFromDb);
    }

    public void deleteRatingById(Long id) {
        ratingRepository.deleteById(id);
    }
}
