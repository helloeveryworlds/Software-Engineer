package com.cheapBuy.itemPriceRetrieval;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Price data API's", version = "2.0", description = "Updates ,compares and manipulates data stored in store and zip tables "))
public class ItemPriceRetrievalApplication {

	public static void main(String[] args) {
		SpringApplication.run(ItemPriceRetrievalApplication.class, args);
	}

}