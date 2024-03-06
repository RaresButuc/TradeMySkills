package com.trademyskills.controller;

import com.trademyskills.model.TypeOfAd;
import com.trademyskills.service.TypeOfAdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
public class TypeOfAdsController {

    private final TypeOfAdService typeOfAdService;

    @GetMapping
    public List<TypeOfAd> getAllTypesOfAds() {
        return typeOfAdService.getAllTypesOfAds();
    }

    @PostMapping
    public ResponseEntity<String> addCategory(@RequestBody TypeOfAd typeOfAd) {
        typeOfAdService.addCategory(typeOfAd);

        return ResponseEntity.ok(typeOfAd.getNameOfCategory() + " Was Successfully Added As A New Category!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTypeOfAdById(@PathVariable("id") Long id) {
        typeOfAdService.deleteTypeOfAdById(id);

        return ResponseEntity.ok("Category Was Successfully Deleted!");
    }
}
