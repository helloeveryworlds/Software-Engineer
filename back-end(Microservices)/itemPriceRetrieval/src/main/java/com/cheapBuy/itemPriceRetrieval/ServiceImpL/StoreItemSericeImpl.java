package com.cheapBuy.itemPriceRetrieval.ServiceImpL;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.hibernate.internal.build.AllowSysOut;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cheapBuy.itemPriceRetrieval.Repository.StoreRepo;
import com.cheapBuy.itemPriceRetrieval.Repository.ZipCodeRepo;
import com.cheapBuy.itemPriceRetrieval.Service.StoreItemService;
import com.cheapBuy.itemPriceRetrieval.dto.ItemListDTO;
import com.cheapBuy.itemPriceRetrieval.dto.StoreDataDTO;
import com.cheapBuy.itemPriceRetrieval.dto.StoreRespDTO;
import com.cheapBuy.itemPriceRetrieval.pojo.Store;
import com.cheapBuy.itemPriceRetrieval.pojo.Zipcode;

@Service
public class StoreItemSericeImpl implements StoreItemService {
	
	@Autowired
	StoreRepo storeRepo;
	
	@Autowired
	ZipCodeRepo zipRepo;
	
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
						avgPrice+=val;
					}
					avgPrice=avgPrice/l1.size();
					Map<String,Object> map1=new LinkedHashMap<>();
					map1.put("\"price\"", lowPrice);
					map1.put("\"avgPrice\"", avgPrice);
					map1.put("\"imgUrl\"", '\"'+imgUrl+'\"');
					map1.put("\"name\"", '\"'+name+'\"');
					data.put('\"'+e1+'\"', map1);
				}
				try {
					String zip=s1.getZipCode();
					Zipcode zipdata=zipRepo.findByCode(zip);
					String list="[0]";
					if(zipdata!=null) {
						if(zipdata.getStoreList()!=null)
							list=zipdata.getStoreList();
					}else {
						continue;
					}
					list=list.substring(1,list.length()-1);
					String [] arr1= list.split(",");
					for(String id:arr1) {
						Long ide=Long.valueOf(id);
						Optional<Store> st1=storeRepo.findById(ide);
						if(st1.isPresent() && st1.get().getName().equals(s1.getStoreName().toLowerCase())) {
							Store st=st1.get();
							st.setName(s1.getStoreName().toLowerCase());
							st.setPriceList(String.valueOf(data));
							storeRepo.save(st);
							break;
						}else {
							Store st=new Store();
							st.setName(s1.getStoreName().toLowerCase());
							st.setPriceList(String.valueOf(data));
							Long newId=storeRepo.save(st).getId();
							if(list.equals("0")) {
								list="";
							}else
								list+=",";
							list="["+list+newId.toString()+"]";
							zipdata.setStoreList(list);
							zipRepo.save(zipdata);
							break;
						}
					}
				}catch(Exception e) {
					e.printStackTrace();
				}
				
			}
		}catch(Exception e) {
			System.out.println("Contact Admin");
		}
		return retList;
	}

	@Override
	public List<Map<String,Object>> comparePrice(List<ItemListDTO> itemListS) {
		List<Map<String,Object>> retList=new ArrayList<>();
		try {
			for(ItemListDTO i:itemListS) {
				Map<String,Object> map1=new HashMap<>();
				String zip=i.getZipCode();
				map1.put("zipCode", zip);
				Zipcode zipData=zipRepo.findByCode(zip);
				Map<String,Object> bestByCategory=new HashMap<>();
				String lowestAvgStoreName="";
				double lowestAvgTotalPrice=0.0;
				String lowestTotalPriceStoreName="";
				double lowestTotalPriceStorePrice=0.0;
				Map<String,Integer>itemList=i.getItemsWithQuantity();
				Set<String> items=itemList.keySet();
				Map<String,Object> storeMap=new HashMap<>();
				if(zipData!=null) {
					String st1=zipData.getStoreList();
					String[] ar1=st1.substring(1,st1.length()-1).split(",");
					for(String idstr:ar1) {
						long id=(long)Long.valueOf(idstr);
						Optional<Store> option=storeRepo.findById(id);
						Map<String,Object> storeTemp=new HashMap<>();
						Store store =option.get();
						String data=store.getDataList().replaceAll("=", ":");
						JSONObject jsonData=new JSONObject(data);
						double totalStorePrice=0.0;
						double totalStoreAvgPrice=0.0;
						for(String item:items) {
							if(jsonData.has(item)) {
								JSONObject tempItem=(JSONObject) jsonData.get(item);
								Map<String,Object> itemTemp=new HashMap<>();
								double itemPrice=tempItem.getDouble("price");
								double avgPrice=tempItem.getDouble("avgPrice");
								Integer quantityOfRequiredItem=itemList.get(item);
								itemPrice*=quantityOfRequiredItem;
								avgPrice*=quantityOfRequiredItem;
								totalStorePrice+=itemPrice;
								totalStoreAvgPrice+=avgPrice;
								itemTemp.put("avgTotalPrice", avgPrice);
								itemTemp.put("lowestPiceTotal",itemPrice );
								itemTemp.put("lowestItemName", tempItem.get("name"));
								itemTemp.put("lowestItemImgUrl", tempItem.get("imgUrl"));
								storeTemp.put(item, itemTemp);
							}
						}
						storeMap.put(store.getName(), storeTemp);
						if(lowestAvgStoreName.equals("")) {
							lowestAvgStoreName=store.getName();
							lowestAvgTotalPrice=totalStoreAvgPrice;
						}else if(lowestAvgTotalPrice>totalStoreAvgPrice) {
							lowestAvgStoreName=store.getName();
							lowestAvgTotalPrice=totalStoreAvgPrice;
						}
						if(lowestTotalPriceStoreName.equals("")) {
							lowestTotalPriceStoreName=store.getName();
							lowestTotalPriceStorePrice=totalStorePrice;
						}else if(lowestTotalPriceStorePrice>totalStorePrice) {
							lowestTotalPriceStoreName=store.getName();
							lowestTotalPriceStorePrice=totalStorePrice;
						}
						map1.put("storeValue", storeMap);
					}
				}else
					map1.put("msg", "The zip code is'nt currently covered under our services");
				bestByCategory.put("lowestTotalPriceStoreName", lowestTotalPriceStoreName);
				bestByCategory.put("lowestAvgStoreName",lowestAvgStoreName );
				bestByCategory.put("lowestTotalPriceStorePrice", lowestTotalPriceStorePrice);
				bestByCategory.put("lowestAvgTotalPrice", lowestAvgTotalPrice);
				map1.put("bestByCategory", bestByCategory);
				retList.add(map1);
			}
		}catch(Exception e) {
			
		}
		return retList;
	}

}
