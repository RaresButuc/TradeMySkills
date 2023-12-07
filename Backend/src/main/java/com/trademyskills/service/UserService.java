package com.trademyskills.service;

import com.trademyskills.model.Rating;
import com.trademyskills.model.User;
import com.trademyskills.service.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.*;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final MailService mailService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, MailService mailService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.mailService = mailService;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public void updateUserById(Long id, User updatedUser) {
        User userFromDb = userRepository.findById(id).orElse(null);
        assert userFromDb != null;
        userFromDb.setName(updatedUser.getName());
        userFromDb.setEmail(updatedUser.getEmail());
        userFromDb.setPhoneNumber(updatedUser.getPhoneNumber());
        userRepository.save(userFromDb);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }


    public String forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with this email: " + email));
        try {
            mailService.sendSetPasswordEmail(email);
        } catch (MessagingException e) {
            throw new RuntimeException("Unable to send set password email. Please try again");
        }
        return "Please check your email to set your password";
    }

    public String setPassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with this email: " + email));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return "New password set successfully";
    }

    public boolean changePasswordAndVerifyOldPassword(Long id, String newPassword, String actualPassword) {
        User user = userRepository.findById(id).orElseThrow(null);

        if (passwordEncoder.matches(actualPassword, user.getPassword()) && !passwordEncoder.matches(newPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public void updateAverageRating(Long id, double newRating) {
        User user = userRepository.findById(id).orElseThrow(null);

        double newAverageRating = user.getAverageRating() + newRating;

        if (user.getAverageRating() != 0) {
            newAverageRating /= 2;
        }
        user.setAverageRating(Float.parseFloat(new DecimalFormat("##.#").format(newAverageRating)));

        userRepository.save(user);
    }

}
