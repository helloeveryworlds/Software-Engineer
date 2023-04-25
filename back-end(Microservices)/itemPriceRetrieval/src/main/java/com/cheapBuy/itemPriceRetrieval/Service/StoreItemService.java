package com.cheapBuy.itemPriceRetrieval.Service;

import java.util.List;
import java.util.Map;

import com.cheapBuy.itemPriceRetrieval.dto.ItemListDTO;
import com.cheapBuy.itemPriceRetrieval.dto.StoreDataDTO;
import com.cheapBuy.itemPriceRetrieval.dto.StoreRespDTO;
import com.cheapBuy.itemPriceRetrieval.dto.ZipStoreRemoveDTO;

public interface StoreItemService {
	
	List<StoreRespDTO> saveStoreData(List<StoreDataDTO> itemList);
	List<Map<String,Object>> comparePrice(List<ItemListDTO> itemListS);
	List<Map<String,String>> removeStoreFromZip(List<ZipStoreRemoveDTO> zipStoreList);
	List<String> zipStoreList(String zipCode);

}
