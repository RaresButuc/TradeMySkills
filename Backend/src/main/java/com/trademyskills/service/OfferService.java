package com.trademyskills.service;

import com.trademyskills.enums.StatusOfOffer;
import com.trademyskills.model.Offer;
import com.trademyskills.model.User;
import com.trademyskills.service.repository.OfferRepository;
import com.trademyskills.service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfferService {
    private OfferRepository offerRepository;

    @Autowired
    public OfferService(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }

    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    public void addOffer(Offer offer) {
        offer.setStatusOfOffer(StatusOfOffer.ACTIVE);
        offerRepository.save(offer);
    }

    public Offer getOfferById(Long id) {
        return offerRepository.findById(id).orElse(null);
    }

    public void updateOfferById(Long id, Offer offerUpdater) {
        Offer offerFromDb = offerRepository.findById(id).orElse(null);
        assert offerFromDb != null;
        offerFromDb.setName(offerUpdater.getName());
        offerFromDb.setStatusOfOffer(offerUpdater.getStatusOfOffer());
        offerFromDb.setDescription(offerUpdater.getDescription());
        offerFromDb.setPrice(offerUpdater.getPrice());
        offerRepository.save(offerFromDb);
    }

    public void deleteOfferById(Long id) {
        offerRepository.deleteById(id);
    }
}
