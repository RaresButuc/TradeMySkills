package com.trademyskills.service;

import com.trademyskills.model.Rating;
import com.trademyskills.model.User;
import com.trademyskills.service.repository.RatingRepository;
import com.trademyskills.service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {
    private final RatingRepository ratingRepository;

    //    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public RatingService(RatingRepository ratingRepository, UserService userService) {
        this.ratingRepository = ratingRepository;
        this.userService = userService;
    }

    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }

    public void addRating(Rating rating) {
        User userToRating = rating.getTo();
        ratingRepository.save(rating);

        userService.updateAverageRating(userToRating.getId(), rating.getStar());
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
