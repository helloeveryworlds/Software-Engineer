package com.cheapBuy.itemPriceRetrieval.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.cheapBuy.itemPriceRetrieval.pojo.ErrorLog;
import jakarta.transaction.Transactional;

@Transactional
public interface ErrorLogRepo extends JpaRepository<ErrorLog,Long>  {
	
	List<ErrorLog> findByAssignee(String name);
	List<ErrorLog> findByStatus(String status);

}
