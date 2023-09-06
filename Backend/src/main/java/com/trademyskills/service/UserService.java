package com.trademyskills.service;

import com.trademyskills.model.User;
import com.trademyskills.service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
private UserRepository userRepository;
@Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void addUser(User user) {
        userRepository.save(user);
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

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }
}
