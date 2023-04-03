package com.bossmode.backend.service;

import com.bossmode.backend.dao.UserDao;
import com.bossmode.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserDao userDao;

    @Autowired
    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    public void signUp(User user) {
        user.setEnabled(true);
        userDao.signUp(user);
    }

    public User getUser(String email) {
        return userDao.getUser(email);
    }
}

