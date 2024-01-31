package com.trademyskills.service.repository;

import com.trademyskills.model.ChangePasswordLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChangePasswordLinkRepository extends JpaRepository<ChangePasswordLink, Long> {
    ChangePasswordLink findByUuid(String uuid);
}
