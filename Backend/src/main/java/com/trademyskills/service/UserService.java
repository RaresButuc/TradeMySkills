package com.trademyskills.service;

import com.trademyskills.model.ChangePasswordLink;
import com.trademyskills.model.User;
import com.trademyskills.service.repository.ChangePasswordLinkRepository;
import com.trademyskills.service.repository.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final MailService mailService;
    private final PasswordEncoder passwordEncoder;
    private final ChangePasswordLinkRepository changePasswordLinkRepository;

    private final ChangePasswordLinkService changePasswordLinkService;


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No user found!"));
    }

    public void updateUserById(Long id, User updatedUser) {
        User userFromDb = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No user found!"));

        if (updatedUser.getEmail() != null &&
                updatedUser.getName() != null &&
                updatedUser.getPhoneNumber() != null &&
                !updatedUser.getEmail().isEmpty() &&
                !updatedUser.getName().isEmpty() &&
                !updatedUser.getPhoneNumber().isEmpty()) {

            userFromDb.setName(updatedUser.getName());
            userFromDb.setEmail(updatedUser.getEmail());
            userFromDb.setPhoneNumber(updatedUser.getPhoneNumber());

            userRepository.save(userFromDb);
        }else {
            throw new IllegalStateException("An error has occurred");
        }

    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new NoSuchElementException("No user found!"));
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }


    public void forgotPassword(String email) {
        try {
            mailService.sendSetPasswordEmail(email);
        } catch (MessagingException e) {
            throw new IllegalStateException("An Unexpected Error has Occurred!");
        }
    }

    public void setPassword(String email, String newPassword, String uuid) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with this email: " + email));
        ChangePasswordLink changePasswordLink = changePasswordLinkRepository.findByUuid(uuid);

        if (changePasswordLink.getEmail().equals(email) && !changePasswordLinkService.verifyIsClosed(uuid)) {
            System.out.println(changePasswordLinkService.verifyIsClosed(uuid));
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
//            return "Congratulations! The New Password Was Set Successfully!";
        }else {
            throw new IllegalStateException("Error! Request a 'New Password Change Request' by Email and Try again!");
        }
    }

    public boolean changePasswordAndVerifyOldPassword(Long id, String newPassword, String actualPassword) {
        User user = userRepository.findById(id).orElseThrow(()->new NoSuchElementException("No user found!"));

        if (passwordEncoder.matches(actualPassword, user.getPassword()) && !passwordEncoder.matches(newPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public void updateAverageRating(Long id, double newRating) {
        User user = userRepository.findById(id).orElseThrow(()->new NoSuchElementException("No user found!"));

        double newAverageRating = user.getAverageRating() + newRating;

        if (user.getAverageRating() != 0) {
            newAverageRating /= 2;
        }
        user.setAverageRating(Float.parseFloat(new DecimalFormat("##.#").format(newAverageRating)));

        userRepository.save(user);
    }

}
