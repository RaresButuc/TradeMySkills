package com.trademyskills.controller;

import com.trademyskills.auth.AuthenticationRequest;
import com.trademyskills.auth.AuthenticationResponse;
import com.trademyskills.auth.AuthenticationService;
import com.trademyskills.auth.RegisterRequest;
import com.trademyskills.model.ChangePasswordRequest;
import com.trademyskills.model.User;
import com.trademyskills.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/users")
public class UserController {
    private final UserService userService;
    private final AuthenticationService service;

    @Autowired
    public UserController(UserService userService, AuthenticationService service) {
        this.userService = userService;
        this.service = service;
    }

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
    public void updateUserById(@PathVariable("id") Long id, @RequestBody User updatedUser) {
        userService.updateUserById(id, updatedUser);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteUserById(@PathVariable("id") Long id) {
        userService.deleteUserById(id);
    }


    @PutMapping("/forget-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        return new ResponseEntity<>(userService.forgotPassword(email), HttpStatus.OK);
    }

    @PutMapping("/set-password")
    public ResponseEntity<String> setPassword(@RequestParam String email, @RequestHeader String newPassword) {
        return new ResponseEntity<>(userService.setPassword(email, newPassword), HttpStatus.OK);
    }

    @PutMapping("/{id}/change-password")
    public ResponseEntity<String> setPassword(@PathVariable("id") Long id, @RequestBody ChangePasswordRequest changePasswordRequest) {
        if (userService.changePasswordAndVerifyOldPassword(id, changePasswordRequest.getNewPassword(), changePasswordRequest.getActualPassword())) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
