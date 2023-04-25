package com.cheapBuy.itemPriceRetrieval.dto;

import java.util.Map;

public class ItemListDTO {
	private String zipCode;
	private Map<String,Integer> itemsWithQuantity;
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public Map<String, Integer> getItemsWithQuantity() {
		return itemsWithQuantity;
	}
	public void setItemsWithQuantity(Map<String, Integer> itemsWithQuantity) {
		this.itemsWithQuantity = itemsWithQuantity;
	}
	

}
