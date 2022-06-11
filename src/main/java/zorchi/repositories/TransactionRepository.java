package zorchi.repositories;

import org.springframework.data.repository.CrudRepository;

import zorchi.entities.Transaction;

/**
 * JPA {@link Transaction} {@link CrudRepository}.
 */
public interface TransactionRepository extends CrudRepository<Transaction, String> {}
