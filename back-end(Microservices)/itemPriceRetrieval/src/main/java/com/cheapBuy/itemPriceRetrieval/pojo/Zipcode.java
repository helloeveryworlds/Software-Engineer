package com.cheapBuy.itemPriceRetrieval.pojo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="ZipCode")
public class Zipcode {
	
	@Id
	@Column(name="code")
	private String code;
	
	@Column(name="storeList")
	private String storeList;

	public String getCode() {
		return code;
	}

	public void setCode(String Code) {
		code = Code;
	}

	public String getStoreList() {
		return storeList;
	}

	public void setStoreList(String storeList) {
		this.storeList = storeList;
	}
	
	

}
