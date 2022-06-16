package zorchi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import zorchi.entities.Transfer;

/**
 * JPA {@link Transaction} {@link CrudRepository}.
 */
public interface TransferRepository extends CrudRepository<Transfer, String> {
	
    @Query(value = "SELECT Transfer.UUID  FROM Transfer JOIN  Transaction On Transfer.from_id = Transaction.UUID Where Transaction.SHORT_ID = :UUID ORDER BY Transfer.Date ASC",  nativeQuery = true)
   List<String> findTransferFormAccountId(@Param("UUID") String UUID);
}
