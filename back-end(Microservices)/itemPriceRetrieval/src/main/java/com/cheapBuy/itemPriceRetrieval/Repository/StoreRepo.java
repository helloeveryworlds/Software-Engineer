package com.cheapBuy.itemPriceRetrieval.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cheapBuy.itemPriceRetrieval.pojo.Store;

import jakarta.transaction.Transactional;

@Transactional
public interface StoreRepo extends JpaRepository<Store,Long>{
	

}
