package com.bossmode.backend.dao;
import org.springframework.stereotype.Repository;
import com.bossmode.backend.entity.User;
@Repository
public class UserDao {

    public void signUp(User customer) {
    }

    public User getUser(String email) {
        return new User();
    }
}
