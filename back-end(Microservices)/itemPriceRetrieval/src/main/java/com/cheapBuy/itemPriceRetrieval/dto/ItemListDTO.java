package com.cheapBuy.itemPriceRetrieval.dto;

import java.util.List;
import java.util.Map;

public class ItemListDTO {
	private List<String> stores;
	private Map<String,Integer> itemsWithQuantity;
	public List<String> getStores() {
		return stores;
	}
	public void setStores(List<String> stores) {
		this.stores = stores;
	}
	public Map<String, Integer> getItemsWithQuantity() {
		return itemsWithQuantity;
	}
	public void setItemsWithQuantity(Map<String, Integer> itemsWithQuantity) {
		this.itemsWithQuantity = itemsWithQuantity;
	}
	

}
