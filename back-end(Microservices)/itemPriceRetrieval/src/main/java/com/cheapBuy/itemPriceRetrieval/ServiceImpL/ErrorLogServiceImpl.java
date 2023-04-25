package com.cheapBuy.itemPriceRetrieval.ServiceImpL;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cheapBuy.itemPriceRetrieval.Repository.ErrorLogRepo;
import com.cheapBuy.itemPriceRetrieval.Service.ErrorLogService;
import com.cheapBuy.itemPriceRetrieval.dto.UpdateErrorLogDTO;
import com.cheapBuy.itemPriceRetrieval.pojo.ErrorLog;

@Service
public class ErrorLogServiceImpl implements ErrorLogService {
	
	@Autowired
	ErrorLogRepo errorRepo;

	@Override
	public List<ErrorLog> recordError(List<String> errorList) {
		List<ErrorLog> retList=new ArrayList<>();
		for(String error:errorList) {
			try {
				ErrorLog tempError=new ErrorLog();
				tempError.setLogMessage(error);
				tempError.setStatus("Pending");
				ErrorLog savedError=errorRepo.save(tempError);
				retList.add(savedError);
			}catch(Exception e) {
				System.out.println("Contact Admin:Issue with log record");
			}
		}
		return retList;
	}

	@Override
	public List<ErrorLog> findAllErrorLogs() {
		List<ErrorLog> retList=new ArrayList<>();
		try {
			retList=errorRepo.findAll();
		}catch(Exception e) {
			System.out.println("Contact Admin:Issue with logs findall");
		}
		return retList;
	}

	@Override
	public List<ErrorLog> findAllErrorPending() {
		List<ErrorLog> retList=new ArrayList<>();
		try {
			retList=errorRepo.findByStatus("pending");
		}catch(Exception e) {
			System.out.println("Contact Admin:Issue with finding logs with status pending");
		}
		return retList;
	}

	@Override
	public List<ErrorLog> findAllErrorByAssignee(String name) {
		List<ErrorLog> retList=new ArrayList<>();
		try {
			retList=errorRepo.findByAssignee(name.toUpperCase());
		}catch(Exception e) {
			System.out.println("Contact Admin:Issue with finding logs with assignee");
		}
		return retList;
	}

	@Override
	public ErrorLog updateErrorLog(UpdateErrorLogDTO updateLog) {
		ErrorLog retError=new ErrorLog();
		try {
			Optional<ErrorLog> option=errorRepo.findById(updateLog.getId());
			List<String> statusList=new ArrayList<>();
			statusList.add("pending");
			statusList.add("completed");
			if(option.isPresent() && (statusList.contains(updateLog.getStatus().toLowerCase()))) {
				ErrorLog tempError=option.get();
				tempError.setAssignee(updateLog.getAssignee().toUpperCase());
				tempError.setStatus(updateLog.getStatus().toLowerCase());
				errorRepo.save(tempError);
				retError=tempError;
			}
		}catch(Exception e) {
			System.out.println("Contact Admin:Issue with update log");
		}
		return retError;
	}

}
