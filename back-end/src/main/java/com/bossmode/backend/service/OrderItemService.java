package com.bossmode.backend.service;
import com.bossmode.backend.entity.User;
import com.bossmode.backend.entity.OrderItem;
import com.bossmode.backend.entity.Cart;
import com.bossmode.backend.dao.OrderItemDao;
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

    public void saveOrderItem(int menuId) {
        final OrderItem orderItem = new OrderItem();
        //final MenuItem menuItem = menuInfoService.getMenuItem(menuId);

        //通过security contextHolder得到自己的info，
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();// user email
        User user = userService.getUser(username);//把menu的order放到用户这边


        //orderItem.setMenuItem(menuItem);
        orderItem.setCart(user.getCart());
        orderItem.setQuantity(1);
        orderItemDao.save(orderItem);
    }
}
