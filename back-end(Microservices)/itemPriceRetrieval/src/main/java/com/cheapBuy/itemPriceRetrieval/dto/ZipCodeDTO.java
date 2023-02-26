package com.cheapBuy.itemPriceRetrieval.dto;

import java.util.List;

public class ZipCodeDTO {
	
	private String codes;
	private List<Long> storeIds;
	public String getCodes() {
		return codes;
	}
	public void setCodes(String codes) {
		this.codes = codes;
	}
	public List<Long> getStoreIds() {
		return storeIds;
	}
	public void setStoreIds(List<Long> storeIds) {
		this.storeIds = storeIds;
	}
	
}
