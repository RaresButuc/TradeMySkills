package com.trademyskills.controller;

import com.trademyskills.auth.AuthenticationRequest;
import com.trademyskills.auth.AuthenticationResponse;
import com.trademyskills.auth.AuthenticationService;
import com.trademyskills.auth.RegisterRequest;
import com.trademyskills.model.User;
import com.trademyskills.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/users")
public class UserController {
    private UserService userService;
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

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
    }

    @GetMapping(value = "/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }

    @PutMapping(value = "/{id}")
    public void updateUserById(@PathVariable("id") Long id, @RequestBody User updatedUser) {
        userService.updateUserById(id, updatedUser);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteUserById(@PathVariable("id") Long id) {
        userService.deleteUserById(id);
    }

}
