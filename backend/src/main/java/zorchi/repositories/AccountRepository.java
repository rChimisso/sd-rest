package zorchi.repositories;





import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import zorchi.entities.Account;



/**
 * JPA {@link Account} {@link CrudRepository}.
 */
public interface AccountRepository extends CrudRepository<Account, String> {
	@Transactional
	@Modifying
	  @Query(
			    value = "UPDATE Account a SET a.is_Deleted = true WHERE a.SHORT_UUID = :SHORT_UUID",
			      nativeQuery = true
			    )
	void accountDeleted(@Param("SHORT_UUID") String SHORT_UUID);
	 
	 @Query(
			    value = "Select * From Account a Where a.is_Deleted = false ",
			      nativeQuery = true
			    )
	List<Account> getAllNotDeleted();
				  
	
}
