package com.cheapBuy.itemPriceRetrieval.Service;

import java.util.List;

import com.cheapBuy.itemPriceRetrieval.dto.ZipCodeDTO;
import com.cheapBuy.itemPriceRetrieval.dto.ZipUpdateDTO;

public interface ZipCodeService {
	
	List<String> getAllZipCode();
	List<ZipUpdateDTO> updateZipCode(List<ZipCodeDTO> listZipCodes);

}
