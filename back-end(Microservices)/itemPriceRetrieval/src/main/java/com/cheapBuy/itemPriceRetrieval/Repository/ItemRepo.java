package com.cheapBuy.itemPriceRetrieval.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cheapBuy.itemPriceRetrieval.pojo.Item;

import jakarta.transaction.Transactional;

@Transactional
public interface ItemRepo extends JpaRepository<Item,Long> {

}
