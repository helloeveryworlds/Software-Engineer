package com.bossmode.backend.service;

import com.bossmode.backend.dao.CartDao;
import com.bossmode.backend.entity.Cart;
import com.bossmode.backend.entity.User;
import com.bossmode.backend.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private UserService userService;

    @Autowired
    private CartDao cartDao;

    public Cart getCart() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        User user = userService.getUser(username);

        if (user != null) {
            Cart cart = user.getCart();
            return cart;
        }
        return new Cart();
    }

    public void cleanCart() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        User user = userService.getUser(username);
        if (user  != null) cartDao.removeAllCartItems(user.getCart());
    }
}
