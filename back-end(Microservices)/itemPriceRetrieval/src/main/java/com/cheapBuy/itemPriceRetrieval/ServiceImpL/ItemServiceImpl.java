package com.cheapBuy.itemPriceRetrieval.ServiceImpL;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cheapBuy.itemPriceRetrieval.Repository.ItemRepo;
import com.cheapBuy.itemPriceRetrieval.Service.ItemService;
import com.cheapBuy.itemPriceRetrieval.pojo.Item;

@Service
public class ItemServiceImpl implements ItemService{
	
	Logger logger = LoggerFactory.getLogger(ItemServiceImpl.class);
	@Autowired
	ItemRepo itemRepo;
	
	@Override
	public Map<String, List<String>> itemRetrieve() {
		Map<String,List<String>> retMap=new HashMap<>();
		try {
			List<Item>itemList=itemRepo.findAll();
			for(Item i:itemList) {
				String cat=i.getCategory();
				if(retMap.containsKey(cat)) {
					List<String> tempList=retMap.get(cat);
					tempList.add(i.getItemName());
					retMap.put(cat, tempList);
				}else {
					List<String> tempList=new ArrayList<>();
					tempList.add(i.getItemName());
					retMap.put(cat, tempList);
				}
			}
		}catch(Exception e) {
			logger.error("An error occured in ItemService:- Item retrieve ");
		}
		return retMap;
	}

}
