package com.trademyskills.controller;

import com.trademyskills.model.TypeOfAd;
import com.trademyskills.service.TypeOfAdService;
import lombok.RequiredArgsConstructor;
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
    public void addCategory(@RequestBody TypeOfAd typeOfAd) {
        typeOfAdService.addCategory(typeOfAd);
    }

    @DeleteMapping("/{id}")
    public void deleteTypeOfAdById(@PathVariable("id") Long id) {
        typeOfAdService.deleteTypeOfAdById(id);
    }
}
