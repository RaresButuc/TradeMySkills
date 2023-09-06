package com.trademyskills.service;

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
        offerRepository.save(offer);
    }

    public Offer getOfferById(Long id) {
        return offerRepository.findById(id).get();
    }

    public void updateOfferById(Long id, Offer offerUpdater) {
        Offer offerFromDb = offerRepository.findById(id).get();
        offerFromDb.setName(offerUpdater.getName());
        offerFromDb.setDescription(offerUpdater.getDescription());
        offerFromDb.setPrice(offerUpdater.getPrice());
        offerRepository.save(offerFromDb);
    }

    public void deleteOfferById(Long id) {
        offerRepository.deleteById(id);
    }
}
