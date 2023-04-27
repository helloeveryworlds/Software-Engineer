package com.bossmode.backend.service;

import com.bossmode.backend.EmailAlreadyExistsException;
import com.bossmode.backend.dao.UserDao;
import com.bossmode.backend.entity.Cart;
import com.bossmode.backend.entity.User;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserDao userDao;
    private PasswordEncoder passwordEncoder;
    @Autowired
    public UserService(UserDao userDao, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }

    public void signUp(User user) throws EmailAlreadyExistsException {
        if (userDao.emailExists(user.getEmail())) {
            throw new EmailAlreadyExistsException("The email is already in use.");
        }
        // create cart when the user signup successfully.
        Cart cart = new Cart();
        user.setCart(cart);

        user.setEnabled(true);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDao.signUp(user);
    }

    public void updateUserInformation(String address, String zipcode) {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        User user = userDao.getUser(username);

        user.setAddress(address);
        user.setZipCode(zipcode);

        userDao.updateUser(user);
    }

    public User getUser(String email) {
        return userDao.getUser(email);
    }
}