package com.cheapBuy.itemPriceRetrieval.dto;

import java.util.ArrayList;
import java.util.Map;

public class StoreDataDTO {
	
	private String storeName;
	private Map<String,ArrayList<Map<String,String>>> priceData;
	public String getStoreName() {
		return storeName;
	}
	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}
	public Map<String, ArrayList<Map<String,String>>> getPriceData() {
		return priceData;
	}
	public void setPriceData(Map<String, ArrayList<Map<String,String>>> priceData) {
		this.priceData = priceData;
	}

	
}
