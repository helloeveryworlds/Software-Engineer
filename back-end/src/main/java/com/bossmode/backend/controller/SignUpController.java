package com.bossmode.backend.controller;

import com.bossmode.backend.EmailAlreadyExistsException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.bossmode.backend.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import com.bossmode.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class SignUpController {
    private UserService userService;
    @Autowired
    public SignUpController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public ResponseEntity<?> signUp(@RequestBody User user) {
        try {
            userService.signUp(user);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("The email is already in use.");
        }
    }
}

