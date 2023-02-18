package com.cheapBuy.itemPriceRetrieval.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cheapBuy.itemPriceRetrieval.pojo.Zipcode;

import jakarta.transaction.Transactional;

@Transactional
public interface ZipCodeRepo extends JpaRepository<Zipcode,String>{

	List<Zipcode> findAll();
	Zipcode findByCode(String code);
}
