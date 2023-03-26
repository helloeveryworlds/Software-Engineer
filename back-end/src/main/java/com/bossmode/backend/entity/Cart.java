package com.bossmode.backend.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
@Entity
@Table(name = "cart")
public class Cart implements Serializable{
    private static final long serialVersionUID = 8436097833452420298L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)//automatically generate
    private int id;
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch=FetchType.EAGER)
    private List<OrderItem> orderItemList;

    @ManyToOne
    @JsonIgnore
    private Cart cart;

    private String foodItem;

    private int quantity;

    public String getFoodItem(){return foodItem;}

    public void setFoodItem(String foodItem){
        this.foodItem = foodItem;
    }

    public int getQuantity(){
        return this.quantity;
    }

    public void setQuantity(int quantity){
        this.quantity = quantity;
    }

    public List<OrderItem> getOrderItemList() {
        return orderItemList;
    }

    public void setOrderItemList(List<OrderItem> orderItemList) {
        this.orderItemList = orderItemList;
    }
    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }
}
