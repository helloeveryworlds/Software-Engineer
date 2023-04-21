package com.bossmode.backend.controller;
import com.bossmode.backend.entity.OrderItem;
import com.bossmode.backend.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
@Controller
public class ItemDeleteController {
    @Autowired
    private OrderItemService orderItemService;

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addMenuItemToCart(@RequestBody OrderItem orderItem) {
        orderItemService.deleteOrderItem(orderItem);
    }
}
