package com.trademyskills.service;

import com.trademyskills.model.ChangePasswordLink;
import com.trademyskills.service.repository.ChangePasswordLinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class ChangePasswordLinkService {
    private final ChangePasswordLinkRepository changePasswordLinkRepository;

    //    Verifica daca exista emailul in baza de date
    public void addNewLink(String uuid, String email) {
        changePasswordLinkRepository.save(new ChangePasswordLink(0L, uuid, email, LocalDateTime.now(), false));
    }

    public boolean verifyIsClosed(String uuid) {
        ChangePasswordLink changePasswordLink = changePasswordLinkRepository.findByUuid(uuid);

        changePasswordLink.setClosed(changePasswordLink.getCreatedDate().until(LocalDateTime.now(), ChronoUnit.MINUTES) > 1);
        changePasswordLinkRepository.save(changePasswordLink);

        return changePasswordLink.getCreatedDate().until(LocalDateTime.now(), ChronoUnit.MINUTES) > 1;
    }

    public String getEmailByUUID(String uuid) {
        return changePasswordLinkRepository.findByUuid(uuid).getEmail();
    }
}
