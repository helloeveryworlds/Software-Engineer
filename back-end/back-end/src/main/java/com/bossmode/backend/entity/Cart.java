package com.bossmode.backend.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;



@Entity
@Table(name = "cart")
public class Cart implements Serializable {
    //The serialVersionUID is a universal version identifier for a Serializable class.
//Deserialization uses this number to ensure that a loaded class corresponds exactly to a serialized object.
//If no match is found, then an InvalidClassException is thrown.
    private static final long serialVersionUID = 8436097833452420298L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)//自从生成，不需要关心上一次number是什么。
    // 也可以用uuid来取代这个自动生成，几乎是一个random string。为什么通常用uuid呢，因为
    // 竞争对手可以通过你的autoID知道你有多少用户。
    private int id;
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch=FetchType.EAGER)
    private List<OrderItem> orderItemList;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<OrderItem> getOrderItemList() {
        return orderItemList;
    }

    public void setOrderItemList(List<OrderItem> orderItemList) {
        this.orderItemList = orderItemList;
    }

}
