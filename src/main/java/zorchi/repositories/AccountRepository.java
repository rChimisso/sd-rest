package zorchi.repositories;

import org.springframework.data.repository.CrudRepository;

import zorchi.entities.Account;

/**
 * JPA {@link Account} Repository.
 */
public interface AccountRepository extends CrudRepository<Account, String> {}
