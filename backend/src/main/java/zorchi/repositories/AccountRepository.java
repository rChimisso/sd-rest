package zorchi.repositories;

import org.springframework.data.repository.CrudRepository;

import zorchi.entities.Account;

/**
 * JPA {@link Account} {@link CrudRepository}.
 */
public interface AccountRepository extends CrudRepository<Account, String> {}
