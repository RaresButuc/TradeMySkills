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

    @GetMapping("/valid/{uuid}")
    public boolean validateLink(@PathVariable("uuid") String uuid) {
        return changePasswordLinkService.verifyIsClosed(uuid);
    }

    @GetMapping("/getemail/{uuid}")
    public String getEmailByUuid(@PathVariable("uuid") String uuid) {
        return changePasswordLinkService.getEmailByUUID(uuid);
    }
}
