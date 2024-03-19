package com.trademyskills.controller;

import com.trademyskills.auth.AuthenticationRequest;
import com.trademyskills.auth.AuthenticationResponse;
import com.trademyskills.auth.AuthenticationService;
import com.trademyskills.auth.RegisterRequest;
import com.trademyskills.model.ChangePasswordRequest;
import com.trademyskills.model.User;
import com.trademyskills.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/users")
public class UserController {

    private final UserService userService;
    private final AuthenticationService service;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }


    @GetMapping(value = "/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public User getUserById(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }

    @GetMapping(value = "/email/{email}")
    public User getUserByEmail(@PathVariable("email") String email) {
        return userService.getUserByEmail(email);
    }


    @PutMapping(value = "/{id}")
    public ResponseEntity<String> updateUserById(@PathVariable("id") Long id, @RequestBody User updatedUser) {
        userService.updateUserById(id, updatedUser);

        return ResponseEntity.ok("Your Profile Was Successfully Edited!");
    }

    @DeleteMapping(value = "/{id}")
    public void deleteUserById(@PathVariable("id") Long id) {
        userService.deleteUserById(id);
    }


    @PutMapping("/forget-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        userService.forgotPassword(email);

        return ResponseEntity.ok("Check Your Email For The `Password Update` Form!");
    }

    @PutMapping("/set-password")
    public ResponseEntity<String> setPassword(@RequestParam String email, @RequestParam String uuid, @RequestHeader String newPassword) {
        userService.setPassword(email, newPassword, uuid);

        return ResponseEntity.ok("Your Password Was Successfully Updated!");
    }

    @PutMapping("/{id}/change-password")
    public ResponseEntity<String> setPassword(@PathVariable("id") Long id, @RequestBody ChangePasswordRequest changePasswordRequest) {
        userService.changePasswordAndVerifyOldPassword(id, changePasswordRequest.getNewPassword(), changePasswordRequest.getActualPassword());

        return ResponseEntity.ok("Your Password Was Successfully Updated!");
    }
}
