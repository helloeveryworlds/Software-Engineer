package com.cheapBuy.itemPriceRetrieval.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ForkJoinPool;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import com.cheapBuy.itemPriceRetrieval.Service.ItemService;
import com.cheapBuy.itemPriceRetrieval.Service.StoreItemService;
import com.cheapBuy.itemPriceRetrieval.Service.ZipCodeService;
import com.cheapBuy.itemPriceRetrieval.dto.ItemListDTO;
import com.cheapBuy.itemPriceRetrieval.dto.StoreDataDTO;
import com.cheapBuy.itemPriceRetrieval.dto.ZipCodeDTO;
import com.cheapBuy.itemPriceRetrieval.dto.ZipUpdateDTO;

@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false" )
@RestController
public class PriceRetrievalController {
	Logger logger = LoggerFactory.getLogger(PriceRetrievalController.class);
	
	@Autowired
	ZipCodeService zipserv;
	
	@Autowired
	StoreItemService storeServ;
	
	@Autowired
	ItemService itemServ;
	
	
	@GetMapping(path="/zipcodes")
	public ResponseEntity<?> priceRetrieval(){
		try {
			List<String> zips=zipserv.getAllZipCode();
			if(zips.isEmpty()) {
				return new ResponseEntity("Updating Zip Code list. Will be up and running soon.",HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity(zips,HttpStatus.OK);
		}catch(Exception e) {
			logger.error("An error occured in zipcode retrieval");
			return new ResponseEntity("Please contact the admin",HttpStatus.NO_CONTENT);
		}
		
	}
	@GetMapping(path="/itemList")
	public ResponseEntity<?> itemRetrieval(){
		try {
			Map<String,List<String>> retList=itemServ.itemRetrieve();
			if(retList.isEmpty())
				return new ResponseEntity("No items where retrieved",HttpStatus.NO_CONTENT);
			return new ResponseEntity(retList,HttpStatus.OK);
		}catch(Exception e) {
			logger.error("Item list has an error");
			return new ResponseEntity("Please contact the admin",HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	@PutMapping(value="/updateZipStoreList",consumes="application/json")
	@ResponseBody
	public ResponseEntity<?> updateZipStoreList(@RequestBody List<ZipCodeDTO> zipList){
		try {
			List<ZipUpdateDTO> retList= zipserv.updateZipCode(zipList);
			if(retList.isEmpty()) 
				return new ResponseEntity("No Zip Code where updated.",HttpStatus.NO_CONTENT);
			return new ResponseEntity(retList,HttpStatus.OK);
		}catch(Exception e){
			logger.error("Update operation has an error");
			return new ResponseEntity("Please contact the admin",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping(value="/comparePrice",consumes="application/json")
	@ResponseBody
	public ResponseEntity<?> comparePrice(@RequestBody List<ItemListDTO> itemList){
		try {
			List<Map<String,Object>> retList=storeServ.comparePrice(itemList);
			if(retList.isEmpty()) 
				return new ResponseEntity("No Prices where retrieved at this time.",HttpStatus.NO_CONTENT);
			return new ResponseEntity(retList,HttpStatus.OK);
		}catch(Exception e){
			logger.error("An occured in compare Price operation");
			return new ResponseEntity("Please contact the admin",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping(value="/insertStoreData",consumes="application/json")
	@ResponseBody
	public DeferredResult<ResponseEntity<?>> insertStoreData(@RequestBody List<StoreDataDTO> itemList){
		DeferredResult<ResponseEntity<?>> output = new DeferredResult<>();
	    ForkJoinPool.commonPool().submit(() -> {
	        try {
	        	storeServ.saveStoreData(itemList);
	        	logger.info("Saved item details in the DB");
	        } catch (Exception e) {
	        	logger.error("An error occured in item save process");
	        }
	        output.setResult(ResponseEntity.ok("Data Received"));
	    });
	   
	    return output;
	}
	
	@GetMapping(path="/zipStoresList/{zipcode}")
	@ResponseBody
	public ResponseEntity<?> zipStoresList(@PathVariable String zipcode){
		try {
			List<Long> retList=zipserv.storeList(zipcode);
			if(retList.isEmpty())
				return new ResponseEntity("No Zip Code are available right now.",HttpStatus.NO_CONTENT);
			return new ResponseEntity(retList,HttpStatus.OK);
		}catch(Exception e) {
			logger.error("An error occured in storelist retrieval");
			return new ResponseEntity("Please contact the admin",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
}
