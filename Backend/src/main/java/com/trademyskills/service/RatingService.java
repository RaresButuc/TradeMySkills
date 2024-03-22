package com.trademyskills.service;

import com.trademyskills.model.Rating;
import com.trademyskills.model.User;
import com.trademyskills.repository.RatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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

    public List<Rating> getAllRatingForUser(Long id){
        return ratingRepository.findAllByTo_Id(id);
    }
    public Page<Rating> getUserRatings(int currentPage, int itemsPerPage, Long userId){
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        List<Rating> allRatingForUser = getAllRatingForUser(userId);

        List<Rating> sublist = allRatingForUser.subList(
                (int) pageRequest.getOffset(),
                Math.min((int) pageRequest.getOffset() + pageRequest.getPageSize(), allRatingForUser.size()));

        return new PageImpl<>(sublist, pageRequest, allRatingForUser.size());
    }


    public void addRating(Rating rating) {

        boolean alreadyRated = verifyAlreadyRated(rating.getFrom().getId(), rating.getTo().getId());

        if (!rating.getTo().getId().equals(rating.getFrom().getId()) && !alreadyRated) {
            User userToRating = rating.getTo();
            ratingRepository.save(rating);

            userService.updateAverageRating(userToRating.getId(), rating.getStar());
        } else {
            throw new IllegalStateException("An Unexpected Error Has Occurred!");
        }
    }

    public boolean verifyAlreadyRated(Long from, Long to) {
        return getAllRatings().stream()
                .anyMatch(e -> e.getFrom().getId().equals(from) && e.getTo().getId().equals(to));
    }

    public Rating getRatingById(Long id) {
        return ratingRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No Rating Found!"));
    }


    public void deleteRatingById(Long id) {
        ratingRepository.deleteById(id);
    }
}
