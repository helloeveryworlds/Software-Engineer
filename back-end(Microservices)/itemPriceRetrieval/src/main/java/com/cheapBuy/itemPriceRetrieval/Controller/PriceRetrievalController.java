package com.cheapBuy.itemPriceRetrieval.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cheapBuy.itemPriceRetrieval.dto.ItemListDTO;

@RestController
public class PriceRetrievalController {
	
	@GetMapping(path="/itemPriceRetrieval/{prodName}")
	public ResponseEntity<?> priceRetrieval(@PathVariable String prodName){
		return new ResponseEntity(prodName,HttpStatus.OK);
	}
	
	@PostMapping(value="/comparePrice",consumes="application/json")
	@ResponseBody
	public ResponseEntity<?> comparePrice(@RequestBody List<ItemListDTO> itemList){
		return new ResponseEntity("WorkInProgress",HttpStatus.OK);
	}
	
}
