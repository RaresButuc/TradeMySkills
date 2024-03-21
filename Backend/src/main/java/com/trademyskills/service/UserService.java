package com.trademyskills.service;

import com.trademyskills.model.ChangePasswordLink;
import com.trademyskills.model.User;
import com.trademyskills.repository.ChangePasswordLinkRepository;
import com.trademyskills.repository.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.List;
import java.util.NoSuchElementException;

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
        return userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No User Found!"));
    }

    public void updateUserById( User updatedUser) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User userFromDb = (User) auth.getPrincipal();

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
        } else {
            throw new IllegalStateException("All Fields Most Be Completed!");
        }

    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new NoSuchElementException("No User Found!"));
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }


    public void forgotPassword(String email) {
        try {
            mailService.sendSetPasswordEmail(email);
        } catch (MessagingException e) {
            throw new IllegalStateException("An Unexpected Error Has Occurred!");
        }
    }

    public void setPassword(String email, String newPassword, String uuid) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("No User Was Found With This Email: " + email));
        ChangePasswordLink changePasswordLink = changePasswordLinkRepository.findByUuid(uuid);

        if (changePasswordLink.getEmail().equals(email) && !changePasswordLinkService.isExpiredByTime(uuid) && !changePasswordLink.isExpired()) {
            changePasswordLink.setExpired(true);
            user.setPassword(passwordEncoder.encode(newPassword));

            userRepository.save(user);
            changePasswordLinkRepository.save(changePasswordLink);

        } else {
            throw new IllegalStateException("Error! Request a 'New Password Change Request' by Email and Try again!");
        }
    }

    public void changePasswordAndVerifyOldPassword(Long id, String newPassword, String actualPassword) {
        User user = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No User Found!"));

        if (passwordEncoder.matches(actualPassword, user.getPassword()) && !passwordEncoder.matches(newPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        } else {
            throw new IllegalStateException("An Unexpected Error Has Occurred!");
        }

    }

    public void updateAverageRating(Long id, double newRating) {
        User user = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No User Found!"));

        double newAverageRating = user.getAverageRating() + newRating;

        if (user.getAverageRating() != 0) {
            newAverageRating /= 2;
        }
        user.setAverageRating(Float.parseFloat(new DecimalFormat("##.#").format(newAverageRating)));

        userRepository.save(user);
    }

}
