package com.bossmode.backend.service;


import com.bossmode.backend.dao.OrderItemDao;
import com.bossmode.backend.entity.Cart;
import com.bossmode.backend.entity.User;
import com.bossmode.backend.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
@Service
public class OrderItemService {

    @Autowired
    private UserService userService;

    @Autowired
    private OrderItemDao orderItemDao;

    public void saveOrderItem(OrderItem orderItem) {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        User user = userService.getUser(username);
        Cart cart = user.getCart();

        // Find if an OrderItem with the given URL and name exists in the user's cart
        OrderItem finalOrderItem = orderItem;
        OrderItem existingOrderItem = cart.getOrderItemList().stream()
                .filter(item -> item.getURL().equals(finalOrderItem.getURL()) && item.getName().equals(finalOrderItem.getName()))
                .findFirst()
                .orElse(null);

        if (existingOrderItem != null) {
            existingOrderItem.setQuantity(existingOrderItem.getQuantity() + finalOrderItem.getQuantity());
            orderItem = existingOrderItem;
        } else {
            orderItem.setCart(cart);
            orderItem.setQuantity(finalOrderItem.getQuantity());
            cart.getOrderItemList().add(orderItem);
        }

        orderItemDao.save(orderItem);
    }

}