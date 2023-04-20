package com.bossmode.backend.service;

import com.bossmode.backend.dao.UserDao;
import com.bossmode.backend.entity.Cart;
import com.bossmode.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
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

    public void signUp(User user) {
        // create cart when the user signup successfully.
        Cart cart = new Cart();
        user.setCart(cart);

        user.setEnabled(true);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDao.signUp(user);
    }

    public User getUser(String email) {
        return userDao.getUser(email);
    }
}