package com.cheapBuy.itemPriceRetrieval.dto;

import java.util.ArrayList;
import java.util.Map;

public class StoreRespDTO {
	
	private Long id;
	private String storeName;
	private Map<String,ArrayList<Map<String,String>>> priceData;
	private String msg;
	private boolean uploaded;
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
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public boolean isUploaded() {
		return uploaded;
	}
	public void setUploaded(boolean uploaded) {
		this.uploaded = uploaded;
	}

}
