package com.cheapBuy.itemPriceRetrieval.Controller;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import com.cheapBuy.itemPriceRetrieval.Service.ErrorLogService;
import com.cheapBuy.itemPriceRetrieval.Service.ItemService;
import com.cheapBuy.itemPriceRetrieval.Service.StoreItemService;
import com.cheapBuy.itemPriceRetrieval.Service.ZipCodeService;
import com.cheapBuy.itemPriceRetrieval.dto.ItemListDTO;
import com.cheapBuy.itemPriceRetrieval.dto.StoreDataDTO;
import com.cheapBuy.itemPriceRetrieval.dto.UpdateErrorLogDTO;
import com.cheapBuy.itemPriceRetrieval.dto.ZipStoreRemoveDTO;
import com.cheapBuy.itemPriceRetrieval.pojo.ErrorLog;

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
	
	@Autowired
	ErrorLogService errorServ;
	
	@GetMapping(path="/zipcodes")
	public ResponseEntity<?> zipcodeRetrieval(){
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
	@GetMapping(path="/storesByCode/{zip}")
	public ResponseEntity<?> storesByZipcode(@PathVariable String zip){
		try {
			List<String> storeList=storeServ.zipStoreList(zip);
			if(storeList.isEmpty()) {
				return new ResponseEntity("Updating Zip Code Store list. Will be up and running soon.",HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity(storeList,HttpStatus.OK);
		}catch(Exception e) {
			logger.error("An error occured in zipcode store retrieval");
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
	@GetMapping(path="/fetchAllErrorLogs")
	public ResponseEntity<?> fetchAllErrorLogs(){
		try {
			List<ErrorLog> retList=errorServ.findAllErrorLogs();
			if(retList.isEmpty())
				return new ResponseEntity("No logs where retrieved",HttpStatus.NO_CONTENT);
			return new ResponseEntity(retList,HttpStatus.OK);
		}catch(Exception e) {
			logger.error("Log list has an error");
			return new ResponseEntity("Please contact the admin",HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@GetMapping(path="/fetchAllErrorLogsByAssignee/{assignee}")
	public ResponseEntity<?> fetchAllErrorLogsByAssignee(@PathVariable String assignee){
		try {
			List<ErrorLog> retList=errorServ.findAllErrorByAssignee(assignee);
			if(retList.isEmpty())
				return new ResponseEntity("No logs with assignee where retrieved",HttpStatus.NO_CONTENT);
			return new ResponseEntity(retList,HttpStatus.OK);
		}catch(Exception e) {
			logger.error("Log list  with assignee has an error");
			return new ResponseEntity("Please contact the admin",HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@GetMapping(path="/fetchAllErrorLogsWithPending")
	public ResponseEntity<?> fetchAllErrorLogsWithPending(){
		try {
			List<ErrorLog> retList=errorServ.findAllErrorPending();
			if(retList.isEmpty())
				return new ResponseEntity("No logs  With Pending status where retrieved",HttpStatus.NO_CONTENT);
			return new ResponseEntity(retList,HttpStatus.OK);
		}catch(Exception e) {
			logger.error("Log list With Pending status has an error");
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
			logger.error("An error occured in compare Price operation");
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
	
	@PostMapping(value="/recordError",consumes="application/json")
	@ResponseBody
	public ResponseEntity<?> recordError(@RequestBody List<String> errorList){
		try {
			List<ErrorLog> retList=errorServ.recordError(errorList);
			if(retList.isEmpty()) 
				return new ResponseEntity("Record where not recorded at this time.",HttpStatus.NO_CONTENT);
			return new ResponseEntity(retList,HttpStatus.OK);
		}catch(Exception e){
			logger.error("An error occured in record error operation");
			return new ResponseEntity("Please contact the admin",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping(path="/removeStoreFromZip")
	@ResponseBody
	public ResponseEntity<?> zipStoresList(@RequestBody List<ZipStoreRemoveDTO> zipStore){
		try {
			List<Map<String,String>> retList=storeServ.removeStoreFromZip(zipStore);
			if(retList.isEmpty())
				return new ResponseEntity("No stores are available right now.",HttpStatus.NO_CONTENT);
			return new ResponseEntity(retList,HttpStatus.OK);
		}catch(Exception e) {
			logger.error("An error occured in storelist removal");
			return new ResponseEntity("Please contact the admin",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@PutMapping(path="/updateErrorLog")
	@ResponseBody
	public ResponseEntity<?> updateErrorLog(@RequestBody UpdateErrorLogDTO errorLog){
		try {
			ErrorLog retLog=errorServ.updateErrorLog(errorLog);
			if(retLog.getId()!=null)
				return new ResponseEntity(retLog,HttpStatus.OK);
			return new ResponseEntity("Invalid Log details entered",HttpStatus.FORBIDDEN);
		}catch(Exception e) {
			logger.error("An error occured in storelist removal");
			return new ResponseEntity("Please contact the admin",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
