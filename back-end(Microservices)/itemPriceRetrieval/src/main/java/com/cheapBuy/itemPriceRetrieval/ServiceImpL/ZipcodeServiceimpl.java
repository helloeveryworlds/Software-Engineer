package com.cheapBuy.itemPriceRetrieval.ServiceImpL;

import java.util.LinkedList;
import java.util.List;

import org.hibernate.internal.build.AllowSysOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.quartz.QuartzTransactionManager;
import org.springframework.stereotype.Service;

import com.cheapBuy.itemPriceRetrieval.Repository.ZipCodeRepo;
import com.cheapBuy.itemPriceRetrieval.Service.ZipCodeService;
import com.cheapBuy.itemPriceRetrieval.dto.ZipCodeDTO;
import com.cheapBuy.itemPriceRetrieval.dto.ZipUpdateDTO;
import com.cheapBuy.itemPriceRetrieval.pojo.Zipcode;

@Service
public class ZipcodeServiceimpl implements ZipCodeService {
	
	@Autowired
	ZipCodeRepo zipRepo;

	@Override
	public List<String> getAllZipCode() {
		List<Zipcode> list1=zipRepo.findAll();
		List<String> retList=new LinkedList<>();
		for(Zipcode z: list1) {
			retList.add(z.getCode());
		}
		return retList;
	}

	@Override
	public List<ZipUpdateDTO> updateZipCode(List<ZipCodeDTO> listZipCodes) {
		List<ZipUpdateDTO> retList=new LinkedList<>();
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
		return retList;
	}


}
