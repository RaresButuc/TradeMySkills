package com.trademyskills.controller;

import com.trademyskills.model.Ad;
import com.trademyskills.model.ChangePasswordLink;
import com.trademyskills.service.ChangePasswordLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/changepassword")
public class ChangePasswordLinkController {
    private final ChangePasswordLinkService changePasswordLinkService;

    @Autowired
    public ChangePasswordLinkController(ChangePasswordLinkService changePasswordLinkService) {
        this.changePasswordLinkService = changePasswordLinkService;
    }

    @PostMapping("/post")
    public void addPassLink(@RequestBody ChangePasswordLink changePasswordLink) {
        changePasswordLinkService.addNewLink(changePasswordLink);
    }

    @GetMapping("/valid")
    public boolean validateLink(@RequestBody ChangePasswordLink changePasswordLink) {
        return changePasswordLinkService.verifyIsClosed(changePasswordLink);
    }
}
