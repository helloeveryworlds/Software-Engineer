package com.cheapBuy.itemPriceRetrieval.pojo;



import org.springframework.lang.NonNull;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name="storeData")
public class Store {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NonNull
	@Column(name="storeName")
	private String name;
	
	@NonNull
	@Column(name="dataList",columnDefinition="LONGTEXT")
	private String dataList;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDataList() {
		return dataList;
	}

	public void setPriceList(String dataList) {
		this.dataList = dataList;
	}
	
	

}
