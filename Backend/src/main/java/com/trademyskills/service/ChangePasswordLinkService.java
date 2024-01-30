package com.trademyskills.service;

import com.trademyskills.model.ChangePasswordLink;
import com.trademyskills.service.repository.ChangePasswordLinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChangePasswordLinkService {
    private final ChangePasswordLinkRepository changePasswordLinkRepository;

    public void addNewLink(ChangePasswordLink changePasswordLink) {
        changePasswordLink.setUuid(UUID.randomUUID());
        changePasswordLink.setCreatedDate(LocalDateTime.now());
        changePasswordLink.setClosed(false);

        changePasswordLinkRepository.save(changePasswordLink);
    }

    public boolean verifyIsClosed(ChangePasswordLink changePasswordLink) {
        changePasswordLink.setClosed(changePasswordLink.getCreatedDate().until(LocalDateTime.now(), ChronoUnit.MINUTES) > 10);
        return changePasswordLink.getCreatedDate().until(LocalDateTime.now(), ChronoUnit.MINUTES) > 10;
    }
}
