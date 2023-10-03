package com.trademyskills.enums;

import lombok.Getter;

@Getter
public enum TypeOfUser {
    CUSTOMER("CUSTOMER"),
    WORKER("WORKER"),
    ADMIN("ADMIN");

    private final String roleName;

    TypeOfUser(String roleName) {
        this.roleName = roleName;
    }

}
