package com.cheapBuy.itemPriceRetrieval.ServiceImpL;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cheapBuy.itemPriceRetrieval.Repository.ErrorLogRepo;
import com.cheapBuy.itemPriceRetrieval.Repository.StoreRepo;
import com.cheapBuy.itemPriceRetrieval.Repository.ZipCodeRepo;
import com.cheapBuy.itemPriceRetrieval.Service.StoreItemService;
import com.cheapBuy.itemPriceRetrieval.dto.ItemListDTO;
import com.cheapBuy.itemPriceRetrieval.dto.StoreDataDTO;
import com.cheapBuy.itemPriceRetrieval.dto.StoreRespDTO;
import com.cheapBuy.itemPriceRetrieval.dto.ZipStoreRemoveDTO;
import com.cheapBuy.itemPriceRetrieval.pojo.ErrorLog;
import com.cheapBuy.itemPriceRetrieval.pojo.Store;
import com.cheapBuy.itemPriceRetrieval.pojo.Zipcode;

@Service
public class StoreItemSericeImpl implements StoreItemService {
	
	@Autowired
	StoreRepo storeRepo;
	
	@Autowired
	ZipCodeRepo zipRepo;
	
	@Autowired
	ErrorLogRepo errorRepo;
	
	@Override
	public List<StoreRespDTO> saveStoreData(List<StoreDataDTO> itemList) {
		List<StoreRespDTO> retList=new ArrayList<>();
		try {
			for(StoreDataDTO s1:itemList) {
				Set<String> set1=s1.getPriceData().keySet();
				Map<String,Map<String,Object>> data=new LinkedHashMap<>();
				for(String e1:set1) {
					List<Map<String,String>> l1=s1.getPriceData().get(e1);
					float lowPrice=0;
					String imgUrl= "";
					String name = "";
					float avgPrice= (float) 0.0;
					float unitPrice= (float) 0.0;
					String unit="";
					String unitLowestName="";
					String unitImgUrl="";
					for(Map<String,String> m1: l1) {
						float val=Float.valueOf(m1.get("price").trim().replace("$", ""));
						float tempUnitPrice=Float.valueOf(m1.get("unit-price").trim().replace("$", ""));
						if(lowPrice == 0) {
							lowPrice=val;
							imgUrl=m1.get("pic-url");
							name=m1.get("name");
							unitPrice=tempUnitPrice;
							unit=m1.get("unit");
							unitImgUrl=m1.get("pic-url");
							unitLowestName=m1.get("name");
						}
						if(lowPrice>val) {
							lowPrice=val;
							imgUrl=m1.get("pic-url");
							name=m1.get("name");
						}
						if(unitPrice>tempUnitPrice) {
							unitPrice=tempUnitPrice;
							unitImgUrl=m1.get("pic-url");
							unitLowestName=m1.get("name");
						}
						avgPrice+=val;
					}
					avgPrice=avgPrice/l1.size();
					Map<String,Object> map1=new LinkedHashMap<>();
					map1.put("\"price\"", lowPrice);
					map1.put("\"avgPrice\"", avgPrice);
					map1.put("\"imgUrl\"", '\"'+imgUrl+'\"');
					map1.put("\"name\"", '\"'+name+'\"');
					map1.put("\"unitImgUrl\"", '\"'+unitImgUrl+'\"');
					map1.put("\"unitLowestName\"", '\"'+unitLowestName+'\"');
					map1.put("\"unit\"", '\"'+unit+'\"');
					map1.put("\"unitPrice\"",unitPrice);
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
					ErrorLog error=new ErrorLog();
					error.setLogMessage("Error in save store data first block");
					error.setStatus("pending");
					errorRepo.save(error);
				}
				
			}
		}catch(Exception e) {
			ErrorLog error=new ErrorLog();
			error.setLogMessage("Error in save store data second block");
			error.setStatus("pending");
			errorRepo.save(error);
		}
		return retList;
	}

	@Override
	public List<Map<String,Object>> comparePrice(List<ItemListDTO> itemListS) {
		List<Map<String,Object>> retList=new ArrayList<>();
		for(ItemListDTO i:itemListS) {
			Map<String,Object> map1=new HashMap<>();
			try {
				String zip=i.getZipCode();
				map1.put("zipCode", zip);
				Zipcode zipData=zipRepo.findByCode(zip);
				Map<String,Object> bestByCategory=new HashMap<>();
				String lowestAvgStoreName="Not all items are available. Check individual stores.";
				Double lowestAvgTotalPrice=0.0;
				String lowestTotalPriceStoreName="Not all items are available. Check individual stores.";
				Double lowestTotalPriceStorePrice=0.0;
				String lowestUnitPriceStoreName="Not all items are available. Check individual stores.";
				Double lowestUnitPriceStorePrice=0.0;
				Map<String,Integer>itemList=i.getItemsWithQuantity();
				Set<String> items=itemList.keySet();
				Map<String,Object> storeMap=new HashMap<>();
				if(zipData!=null) {
					String st1=zipData.getStoreList();
					if(st1!=null) {
						st1=st1.substring(1,st1.length()-1);
						if(!st1.contentEquals("")) {
							String [] ar1=st1.split(",");
							for(String idstr:ar1) {
								long id=(long)Long.valueOf(idstr);
								Optional<Store> option=storeRepo.findById(id);
								Map<String,Object> storeTemp=new HashMap<>();
								Store store =option.get();
								String data=store.getDataList().replaceAll("=", ":");
								JSONObject jsonData=new JSONObject(data);
								double totalStorePrice=0.0;
								double totalStoreAvgPrice=0.0;
								double totalUnitPrice=0.0;
								boolean missingItem=false;
								for(String item:items) {
									Map<String,Object> itemTemp=new HashMap<>();
									if(jsonData.has(item)) {
										JSONObject tempItem=(JSONObject) jsonData.get(item);
										double itemPrice=tempItem.getDouble("price");
										double itemUnitPrice=tempItem.getDouble("unitPrice");
										double avgPrice=tempItem.getDouble("avgPrice");
										Integer quantityOfRequiredItem=itemList.get(item);
										itemPrice*=quantityOfRequiredItem;
										avgPrice*=quantityOfRequiredItem;
										totalStorePrice+=itemPrice;
										totalStoreAvgPrice+=avgPrice;
										totalUnitPrice+=itemUnitPrice;
										itemTemp.put("avgTotalPrice", avgPrice);
										itemTemp.put("lowestPriceTotal",itemPrice );
										itemTemp.put("lowestItemName", tempItem.get("name"));
										itemTemp.put("lowestItemImgUrl", tempItem.get("imgUrl"));
										itemTemp.put("lowestUnitPriceTotal",itemUnitPrice );
										itemTemp.put("lowestUnitItemName", tempItem.get("unitLowestName"));
										itemTemp.put("lowestUnitItemImgUrl", tempItem.get("unitImgUrl"));
										itemTemp.put("lowestUnit", tempItem.get("unit"));
									}else {
										missingItem=true;
										itemTemp.put("msg","Item is currently unavailable");
									}
									storeTemp.put(item, itemTemp);
								}
								storeMap.put(store.getName(), storeTemp);
								if(!missingItem) {
									if(lowestAvgTotalPrice.equals(0.0)) {
										lowestAvgStoreName=store.getName();
										lowestAvgTotalPrice=totalStoreAvgPrice;
									}else if(lowestAvgTotalPrice>totalStoreAvgPrice) {
										lowestAvgStoreName=store.getName();
										lowestAvgTotalPrice=totalStoreAvgPrice;
									}
									if(lowestTotalPriceStorePrice.equals(0.0)) {
										lowestTotalPriceStoreName=store.getName();
										lowestTotalPriceStorePrice=totalStorePrice;
									}else if(lowestTotalPriceStorePrice>totalStorePrice) {
										lowestTotalPriceStoreName=store.getName();
										lowestTotalPriceStorePrice=totalStorePrice;
									}
									if(lowestUnitPriceStorePrice.equals(0.0)) {
										lowestUnitPriceStoreName=store.getName();
										lowestUnitPriceStorePrice=totalUnitPrice;
									}else if(lowestUnitPriceStorePrice>totalUnitPrice) {
										lowestUnitPriceStoreName=store.getName();
										lowestUnitPriceStorePrice=totalUnitPrice;
									}
								}
								map1.put("storeValue", storeMap);
							}
							bestByCategory.put("lowestTotalPriceStoreName", lowestTotalPriceStoreName);
							bestByCategory.put("lowestAvgStoreName",lowestAvgStoreName );
							bestByCategory.put("lowestTotalPriceStorePrice", lowestTotalPriceStorePrice);
							bestByCategory.put("lowestAvgTotalPrice", lowestAvgTotalPrice);
							bestByCategory.put("lowestUnitPriceStoreName", lowestUnitPriceStoreName);
							bestByCategory.put("lowestUnitPriceStorePrice", lowestUnitPriceStorePrice);
							map1.put("bestByCategory", bestByCategory);
						}else
							map1.put("msg", "The zip code doesn't have any store that we compare prices too.");
					}else 
						map1.put("msg", "The zip code doesn't have any store that we compare prices too.");
				}else
					map1.put("msg", "The zip code is'nt currently covered under our services");
				retList.add(map1);
			}catch(Exception e) {
				e.printStackTrace();
				ErrorLog error=new ErrorLog();
				error.setLogMessage("Error in store compare first");
				error.setStatus("pending");
				errorRepo.save(error);
			}
		}
		return retList;
	}

	@Override
	public List<Map<String, String>> removeStoreFromZip(List<ZipStoreRemoveDTO> zipStoreList) {
		List<Map<String,String>> retList=new ArrayList<>();
		for(ZipStoreRemoveDTO zipStoresToRemove:zipStoreList) {
			Map<String,String> tempMap=new HashMap<>();
			String zip=zipStoresToRemove.getZipCode();
			try {
				Zipcode zipData=zipRepo.findByCode(zip);
				if(zipData!=null) {
					String storeData=zipData.getStoreList();
					String [] storeArray=storeData.substring(1, storeData.length()-1).trim().split(",");
					ArrayList<String> storeIndexList=new ArrayList<>(Arrays.asList(storeArray));
					for(String index:storeArray) {
						Optional<Store>  storeOption=storeRepo.findById(Long.valueOf(index.trim()));
						if(storeOption.isPresent()) {
							Store store=storeOption.get();
							String storeName=store.getName();
							if(zipStoresToRemove.getStoreList().contains(storeName)) {
								int indexToRemove=storeIndexList.indexOf(index);
								storeIndexList.remove(indexToRemove);
								storeRepo.deleteById(Long.valueOf(index));
							}
						}
					}
					zipData.setStoreList(storeIndexList.toString().replaceAll(" ", ""));
					zipRepo.save(zipData);
				}
				tempMap.put(zip, "Removed required stores successfully");
			}catch(Exception e) {
				tempMap.put(zip, "Couldn't remove stores from particular zipcode");
			}
			retList.add(tempMap);
		}
		return retList;
	}

	@Override
	public List<String> zipStoreList(String zipCode) {
		List<String> storeList=new ArrayList<>();
		try {
			Zipcode zipData=zipRepo.findByCode(zipCode);
			if(zipData!=null) {
				String storeData=zipData.getStoreList();
				String [] storeArray=storeData.substring(1, storeData.length()-1).trim().split(",");
				for(String index:storeArray) {
					Optional<Store>  storeOption=storeRepo.findById(Long.valueOf(index.trim()));
					if(storeOption.isPresent()) {
						Store store=storeOption.get();
						String storeName=store.getName();
						storeList.add(storeName);
					}
				}
			}
		}catch(Exception e) {
			ErrorLog error=new ErrorLog();
			error.setLogMessage("Error in zip storeList first block");
			error.setStatus("pending");
			errorRepo.save(error);
		}
		return storeList;
	}

}
