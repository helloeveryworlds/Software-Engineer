package com.cheapBuy.itemPriceRetrieval.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cheapBuy.itemPriceRetrieval.Service.ZipCodeService;
import com.cheapBuy.itemPriceRetrieval.dto.ItemListDTO;
import com.cheapBuy.itemPriceRetrieval.dto.StoreDataDTO;
import com.cheapBuy.itemPriceRetrieval.dto.ZipCodeDTO;
import com.cheapBuy.itemPriceRetrieval.dto.ZipUpdateDTO;

@RestController
public class PriceRetrievalController {
	
	@Autowired
	ZipCodeService zipserv;
	
	
	@GetMapping(path="/zipcodes")
	public ResponseEntity<?> priceRetrieval(){
		try {
			List<String> zips=zipserv.getAllZipCode();
			return new ResponseEntity(zips,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity("Please contact the admin",HttpStatus.NO_CONTENT);
		}
		
	}
	@PutMapping(value="/updateZipStoreList",consumes="application/json")
	@ResponseBody
	public ResponseEntity<?> updateZipStoreList(@RequestBody List<ZipCodeDTO> zipList){
		List<ZipUpdateDTO> retList= zipserv.updateZipCode(zipList);
		return new ResponseEntity(retList,HttpStatus.OK);
	}
	
	@PostMapping(value="/comparePrice",consumes="application/json")
	@ResponseBody
	public ResponseEntity<?> comparePrice(@RequestBody List<ItemListDTO> itemList){
		return new ResponseEntity("WorkInProgress",HttpStatus.OK);
	}
	
	@PostMapping(value="/insertStoreData",consumes="application/json")
	@ResponseBody
	public ResponseEntity<?> insertStoreData(@RequestBody List<StoreDataDTO> itemList){
		return new ResponseEntity("WorkInProgress",HttpStatus.OK);
	}
	
	
	
	
}
