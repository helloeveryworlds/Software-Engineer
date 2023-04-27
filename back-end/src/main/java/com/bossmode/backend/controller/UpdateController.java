package com.bossmode.backend.controller;

import com.bossmode.backend.EmailAlreadyExistsException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.bossmode.backend.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import com.bossmode.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Controller
public class UpdateController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public void updateUser(@RequestParam("address") String address, @RequestParam("zipcode") String zipcode) {
        userService.updateUserInformation(address, zipcode);
    }
}