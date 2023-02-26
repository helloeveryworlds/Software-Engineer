package com.cheapBuy.itemPriceRetrieval.dto;

import java.util.List;
import java.util.Map;

public class ItemListDTO {
	private Long zipCode;
	private Map<String,Integer> itemsWithQuantity;
	public Long getZipCode() {
		return zipCode;
	}
	public void setZipCode(Long zipCode) {
		this.zipCode = zipCode;
	}
	public Map<String, Integer> getItemsWithQuantity() {
		return itemsWithQuantity;
	}
	public void setItemsWithQuantity(Map<String, Integer> itemsWithQuantity) {
		this.itemsWithQuantity = itemsWithQuantity;
	}
	

}
