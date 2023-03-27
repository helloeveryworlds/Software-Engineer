package com.cheapBuy.itemPriceRetrieval.Service;

import java.util.List;

import com.cheapBuy.itemPriceRetrieval.dto.ItemListDTO;
import com.cheapBuy.itemPriceRetrieval.dto.StoreDataDTO;
import com.cheapBuy.itemPriceRetrieval.dto.StoreRespDTO;

public interface StoreItemService {
	
	List<StoreRespDTO> saveStoreData(List<StoreDataDTO> itemList);
	void comparePrice(List<ItemListDTO> itemListS);

}
