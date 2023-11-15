package com.trademyskills.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequest {
    private String actualPassword;
    private String newPassword;
}
