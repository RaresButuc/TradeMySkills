package com.trademyskills.service;

import com.trademyskills.model.ChangePasswordLink;
import com.trademyskills.repository.ChangePasswordLinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;


@Service
@RequiredArgsConstructor
public class ChangePasswordLinkService {

    private final ChangePasswordLinkRepository changePasswordLinkRepository;

    public String getEmailByUUID(String uuid) {
        return changePasswordLinkRepository.findByUuid(uuid).getEmail();
    }

    public void addNewLink(String uuid, String email) {
        changePasswordLinkRepository.save(new ChangePasswordLink(0L, uuid, email, LocalDateTime.now(), false));
    }

    public boolean isExpiredByTime(String uuid) {
        ChangePasswordLink changePasswordLink = changePasswordLinkRepository.findByUuid(uuid);
        boolean expirationState = changePasswordLink.getCreatedDate().until(LocalDateTime.now(), ChronoUnit.MINUTES) > 60;

        changePasswordLink.setExpired(expirationState);

        return expirationState;
    }

    public boolean isRequestExpired(String uuid) {
        return changePasswordLinkRepository.findByUuid(uuid).isExpired();
    }

}
