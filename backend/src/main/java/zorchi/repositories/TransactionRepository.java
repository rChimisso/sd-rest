package zorchi.repositories;

import java.util.List;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import zorchi.entities.Transaction;
import zorchi.entities.Transaction.TransactionFullDataInterface;;

/**
 * JPA {@link Transaction} {@link CrudRepository}.
 */
public interface TransactionRepository extends CrudRepository<Transaction, String> {
	
		   
	  @Query(value = "SELECT a1.UUID, a1.DATE, a1.Amount as amount, a1.SHORT_ID as idFrom, a2.SHORT_ID as idTo , a1.account FROM "
		  		+"(SELECT t1.SHORT_ID as account, t2.SHORT_ID   , t1.UUID, t1.DATE, t1.AMOUNT as Amount   "
		  		  		+" FROM "
		  		  	+"	TRANSACTION as t1 LEFT JOIN TRANSFER as s1 ON t1.UUID = s1.FROM_ID LEFT JOIN"
		  		  	+"	TRANSACTION as t2 ON t2.UUID = s1.FROM_ID"

		  		  	+"	)  a1  JOIN   (SELECT "
		  		  	
		  		  	+"	t1.UUID, t2.SHORT_ID "
		  		  		
		  		  	+"	 FROM  "
		  		  	+"	TRANSACTION as t1 LEFT JOIN TRANSFER as s1 ON t1.UUID = s1.TO_ID LEFT JOIN"
		  		  	+"	TRANSACTION as t2 ON t2.UUID = s1.TO_ID"

		  		  	+"	)  a2 "
		  		  	+"	ON (a1.UUID = a2.UUID)"
		  +"	Where a1.account= :UUID"
			  
			  /*
			   * 
			   * 
SELECT * FROM TRANSACTION as t1,  TRANSACTION as t2 WHERE   SHORT_ID= '82B042B73E5EF5516890';

(SELECT s1.SHORT_ID AS F , s2.SHORT_ID AS T, t1.amount, t1.date  FROM TRANSFER as t1 JOIN TRANSACTION as s1 ON t1.FROM_ID = s1.UUID JOIN TRANSACTION AS s2 on t1.TO_ID  = s2.UUID)

			   * 
			   * "SELECT a1.UUID, a1.DATE, a1.Amount as amount, a1.SHORT_ID as idFrom, a2.SHORT_ID as idTo FROM "
	  		+ "(SELECT t2.SHORT_ID, t1.UUID, t1.DATE, t1.AMOUNT as Amount   "
	  		+ " FROM "
	  		+"TRANSACTION as t1 LEFT JOIN TRANSFER as s1 ON t1.UUID = s1.FROM_ID LEFT JOIN"
	  		+"TRANSACTION as t2 ON t2.UUID = s1.FROM_ID"
	  		+"WHERE s1.FROM_ID IN (NULL , 'France');"
	  		+ ")  a1 JOIN   (SELECT "
	  	
	  		+ "t1.UUID,t2.SHORT_ID "
	  		
	  		+ " FROM  "
	  		+"TRANSACTION as t1 LEFT JOIN TRANSFER as s1 ON t1.UUID = s1.FROM_ID LEFT JOIN"
	  		+"TRANSACTION as t2 ON t2.UUID = s1.TO_ID"
	  		+ ")  a2 "
	  		+ "ON (a1.UUID = a2.UUID)"
	  		
	  		+ "WHERE "
	  		+ "a1.SHORT_ID = :UUID OR a2.SHORT_ID = :UUID"*/
	  		,  nativeQuery = true)
	  
	  

	  List<TransactionFullDataInterface> findTransactionFormAccountId(@Param("UUID") String UUID);
}
