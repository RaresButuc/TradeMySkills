\package com.trademyskills.service;

import com.trademyskills.model.Offer;
import com.trademyskills.service.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {
private OfferRepository offerRepository;
@Autowired
    public RatingService(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }

    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    public void addOffer(Offer offer) {
        offerRepository.save(offer);
    }

    public Offer getOfferById(Long id) {
        return offerRepository.getById(id);
    }

    public void updateOfferById(Long id, Offer offerUpdater) {
        Offer offerFromDb = offerRepository.getById(id);
        offerFromDb.setName(offerUpdater.getName());
        offerFromDb.setDescription(offerUpdater.getDescription());
        offerFromDb.setPrice(offerUpdater.getPrice());
        offerRepository.save(offerFromDb);
    }

    public void deleteOfferById(Long id) {
        offerRepository.deleteById(id);
    }
}
