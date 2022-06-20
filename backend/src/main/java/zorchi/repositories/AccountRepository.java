package zorchi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import zorchi.entities.Account;
import zorchi.entities.abstractions.Movement.GenericMovement;

/**
 * JPA {@link Account} {@link CrudRepository}.
 */
public interface AccountRepository extends CrudRepository<Account, String> {
  /**
   * Restituisce tutte le istanze del tipo che hanno la flag deleted settata a false.
	 *
	 * @return tutte le entità non flaggate come deleted.
	 */
	List<Account> findAllByDeletedFalse();
  /**
   * Restituisce tutti i movimenti bancari associati all'{@link zorchi.entities.Account Account bancario} specificato tramite {@code UUID}.
   * 
   * @param UUID - UUID dell'{@link zorchi.entities.Account Account bancario}.
   * @return tutti i movimenti bancari associati.
   */
  @Query(
    value =
      "SELECT * FROM (" +
        "(" + 
          "SELECT Transactions.UUID, Transactions.amount, Transactions.date, Movements.sender, Movements.recipient" +
          "FROM" +
            "(SELECT * FROM TRANSACTION WHERE ACCOUNT_UUID = :UUID) as Transactions" +
            "LEFT JOIN" +
            "(" +
              "SELECT STransaction.ACCOUNT_UUID AS sender, STransaction.UUID AS Suuid, RTransaction.ACCOUNT_UUID AS recipient, RTransaction.UUID AS Ruuid, Transfers.amount, Transfers.date" +
              "FROM TRANSFER as Transfers JOIN TRANSACTION as STransaction ON Transfers.SENDER_TRANSACTION = STransaction.UUID JOIN TRANSACTION AS RTransaction ON Transfers.RECIPIENT_TRANSACTION = RTransaction.UUID" +
            ") as Movements" +
            "ON Transactions.UUID = Movements.Suuid OR Transactions.UUID = Movements.Ruuid" +
          "WHERE Movements.amount IS NULL" +
        ")" +
        "UNION ALL" +
        "(" +
          "SELECT Transfers.UUID, Transfers.amount, Transfers.date, STransaction.ACCOUNT_UUID AS sender, RTransaction.ACCOUNT_UUID AS recipient" +
          "FROM TRANSFER as Transfers JOIN TRANSACTION as STransaction ON Transfers.SENDER_TRANSACTION = STransaction.UUID JOIN TRANSACTION AS RTransaction ON Transfers.RECIPIENT_TRANSACTION = RTransaction.UUID" +
          "WHERE sender = :UUID OR recipient = :UUID" +
        ")" +
      ") ORDER BY date DESC",
    nativeQuery = true
  )
  List<GenericMovement> findAllMovementsForAccount(@Param("UUID") String UUID);
}
