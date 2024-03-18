package com.trademyskills.controller;

import com.trademyskills.model.ChangePasswordLink;
import com.trademyskills.service.ChangePasswordLinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/changepassword")
public class ChangePasswordLinkController {

    private final ChangePasswordLinkService changePasswordLinkService;

    @GetMapping("/isTimeExpired/{uuid}")
    public boolean isReqExpiredByTime(@PathVariable("uuid") String uuid) {
        return changePasswordLinkService.isExpiredByTime(uuid);
    }

    @GetMapping("/getEmail/{uuid}")
    public String getEmailByUuid(@PathVariable("uuid") String uuid) {
        return changePasswordLinkService.getEmailByUUID(uuid);
    }

    @GetMapping("/isRequestExpired/{uuid}")
    public boolean getRequestByUuid(@PathVariable("uuid") String uuid) {
        return changePasswordLinkService.isRequestExpired(uuid);
    }
}
