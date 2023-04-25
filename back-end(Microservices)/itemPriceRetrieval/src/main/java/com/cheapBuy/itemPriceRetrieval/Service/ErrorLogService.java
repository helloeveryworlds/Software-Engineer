package com.cheapBuy.itemPriceRetrieval.Service;

import java.util.List;
import com.cheapBuy.itemPriceRetrieval.dto.UpdateErrorLogDTO;
import com.cheapBuy.itemPriceRetrieval.pojo.ErrorLog;

public interface ErrorLogService {
	
	List<ErrorLog> recordError(List<String> errorList);
	List<ErrorLog> findAllErrorLogs();
	List<ErrorLog> findAllErrorPending();
	List<ErrorLog> findAllErrorByAssignee(String name);
	ErrorLog updateErrorLog(UpdateErrorLogDTO updateLogList);
	
}
