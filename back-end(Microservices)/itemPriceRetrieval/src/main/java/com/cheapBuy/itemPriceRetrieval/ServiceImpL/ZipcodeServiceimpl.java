package com.cheapBuy.itemPriceRetrieval.ServiceImpL;

import java.util.LinkedList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cheapBuy.itemPriceRetrieval.Repository.ZipCodeRepo;
import com.cheapBuy.itemPriceRetrieval.Service.ZipCodeService;
import com.cheapBuy.itemPriceRetrieval.pojo.Zipcode;

@Service
public class ZipcodeServiceimpl implements ZipCodeService {
	
	Logger logger = LoggerFactory.getLogger(ZipcodeServiceimpl.class);
	
	@Autowired
	ZipCodeRepo zipRepo;

	@Override
	public List<String> getAllZipCode() {
		List<String> retList=new LinkedList<>();
		try {
			List<Zipcode> list1=zipRepo.findAll();
			for(Zipcode z: list1) {
				retList.add(z.getCode());
			}
		}catch(Exception e) {
			logger.error("An error occured in ZipcodeService:- retrieving zipCode");
		}
		return retList;
	}

}
