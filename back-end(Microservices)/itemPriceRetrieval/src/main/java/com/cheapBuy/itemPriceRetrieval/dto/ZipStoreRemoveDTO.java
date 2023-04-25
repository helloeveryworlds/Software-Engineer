package com.cheapBuy.itemPriceRetrieval.dto;

import java.util.List;

public class ZipStoreRemoveDTO {
	
	private String zipCode;
	private List<String> storeList;
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public List<String> getStoreList() {
		return storeList;
	}
	public void setStoreList(List<String> storeList) {
		this.storeList = storeList;
	}

}
