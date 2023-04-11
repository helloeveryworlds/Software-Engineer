package com.cheapBuy.itemPriceRetrieval.ServiceImpL;

import java.util.LinkedList;
import java.util.List;

import org.hibernate.internal.build.AllowSysOut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.quartz.QuartzTransactionManager;
import org.springframework.stereotype.Service;

import com.cheapBuy.itemPriceRetrieval.Controller.PriceRetrievalController;
import com.cheapBuy.itemPriceRetrieval.Repository.ZipCodeRepo;
import com.cheapBuy.itemPriceRetrieval.Service.ZipCodeService;
import com.cheapBuy.itemPriceRetrieval.dto.ZipCodeDTO;
import com.cheapBuy.itemPriceRetrieval.dto.ZipUpdateDTO;
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

	@Override
	public List<ZipUpdateDTO> updateZipCode(List<ZipCodeDTO> listZipCodes) {
		List<ZipUpdateDTO> retList=new LinkedList<>();
		try {
			for(ZipCodeDTO z1:listZipCodes) {
				Zipcode z =zipRepo.findByCode(z1.getCodes());
				ZipUpdateDTO zt=new ZipUpdateDTO();
				if(z!=null && 
				 z1.getStoreIds().size()!=0 &&
				!z1.getStoreIds().contains((long)0)) {
					
					String storeList=String.valueOf(z1.getStoreIds());
					z.setStoreList(storeList);
					zipRepo.save(z);
					
					zt.setCode(z.getCode());
					zt.setMsg("Updated Successfully");
					zt.setUpdateStatus(true);
				}else {
					zt.setCode(z1.getCodes());
					zt.setMsg("ZipCode does not exist in our network currently");
					zt.setUpdateStatus(false);
				}
				retList.add(zt);
			}
		}catch(Exception e) {
			logger.error("An error occured in ZipcodeService:- update Zipcode");
		}
		return retList;
	}

	@Override
	public List<Long> storeList(String zipCode) {
		List<Long> retList=new LinkedList<>();
		try {
			Zipcode z =zipRepo.findByCode(zipCode);
			if(z!=null) {
				String s=z.getStoreList().substring(1, z.getStoreList().length()-1);
				String [] arr=s.split(",");
				for(String a1:arr) {
					retList.add(Long.valueOf(a1));
				}
			}
		}catch(Exception e) {
			logger.error("An error occured in ZipcodeService:- retrieve storeList");
		}
		
		return retList;
	}


}
