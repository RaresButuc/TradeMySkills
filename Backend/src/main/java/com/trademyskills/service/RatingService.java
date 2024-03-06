package com.trademyskills.service;

import com.trademyskills.model.Rating;
import com.trademyskills.model.User;
import com.trademyskills.service.repository.RatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class RatingService {
    private final RatingRepository ratingRepository;
    private final UserService userService;


    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }

    public void addRating(Rating rating) {

        boolean alreadyRated = verifyAlreadyRated(rating.getFrom().getId(), rating.getTo().getId());

        if (!rating.getTo().getId().equals(rating.getFrom().getId()) && !alreadyRated) {
            User userToRating = rating.getTo();
            ratingRepository.save(rating);

            userService.updateAverageRating(userToRating.getId(), rating.getStar());
        } else {
            throw new IllegalStateException("An error has occurred");
        }
    }

    public boolean verifyAlreadyRated(Long from, Long to) {
        return getAllRatings().stream()
                .anyMatch(e -> e.getFrom().getId().equals(from) && e.getTo().getId().equals(to));
    }

    public Rating getRatingById(Long id) {
        return ratingRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No rating found!"));
    }


    public void deleteRatingById(Long id) {
        ratingRepository.deleteById(id);
    }
}
