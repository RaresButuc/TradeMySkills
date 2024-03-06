package com.trademyskills.controller;

import com.trademyskills.service.ChangePasswordLinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/changepassword")
public class ChangePasswordLinkController {

    private final ChangePasswordLinkService changePasswordLinkService;

    @GetMapping("/valid/{uuid}")
    public boolean validateLink(@PathVariable("uuid") String uuid) {
        return changePasswordLinkService.verifyIsClosed(uuid);
    }

    @GetMapping("/getemail/{uuid}")
    public String getEmailByUuid(@PathVariable("uuid") String uuid) {
        return changePasswordLinkService.getEmailByUUID(uuid);
    }
}
