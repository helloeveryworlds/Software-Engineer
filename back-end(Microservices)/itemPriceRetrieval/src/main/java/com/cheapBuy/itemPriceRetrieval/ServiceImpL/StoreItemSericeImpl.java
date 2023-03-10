package com.cheapBuy.itemPriceRetrieval.ServiceImpL;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cheapBuy.itemPriceRetrieval.Repository.ItemRepo;
import com.cheapBuy.itemPriceRetrieval.Repository.StoreRepo;
import com.cheapBuy.itemPriceRetrieval.Service.StoreItemService;
import com.cheapBuy.itemPriceRetrieval.dto.StoreDataDTO;
import com.cheapBuy.itemPriceRetrieval.dto.StoreRespDTO;
import com.cheapBuy.itemPriceRetrieval.pojo.Store;

@Service
public class StoreItemSericeImpl implements StoreItemService {
	
	@Autowired
	StoreRepo storeRepo;
	
	@Autowired
	ItemRepo itemRepo;
	
	@Override
	public List<StoreRespDTO> saveStoreData(List<StoreDataDTO> itemList) {
		List<StoreRespDTO> retList=new ArrayList<>();
		try {
			for(StoreDataDTO s1:itemList) {
				StoreRespDTO sr=new StoreRespDTO();
				Set<String> set1=s1.getPriceData().keySet();
				Map<String,Map<String,Object>> data=new LinkedHashMap<>();
				for(String e1:set1) {
					List<Map<String,String>> l1=s1.getPriceData().get(e1);
					float lowPrice=0;
					String imgUrl= "";
					String name = "";
					float avgPrice= (float) 0.0;
					for(Map<String,String> m1: l1) {
						float val=Float.valueOf(m1.get("price").trim().substring(1));
						if(lowPrice == 0) {
							lowPrice=val;
							imgUrl=m1.get("pic-url");
							name=m1.get("name");
							avgPrice+=val;
						}
						if(lowPrice>val) {
							lowPrice=val;
							imgUrl=m1.get("pic-url");
							name=m1.get("name");
							avgPrice+=val;
						}
					}
					avgPrice=avgPrice/l1.size();
					Map<String,Object> map1=new LinkedHashMap<>();
					map1.put("price", lowPrice);
					map1.put("avgPrice", avgPrice);
					map1.put("imgUrl", imgUrl);
					map1.put("name", name);
					data.put(e1, map1);
				}
				Store st=new Store();
				st.setName(s1.getStoreName().toLowerCase());
				st.setPriceList(String.valueOf(data));
				storeRepo.save(st);
			}
		}catch(Exception e) {
			System.out.println("Contact Admin");
		}
		return retList;
	}

}
