package zorchi.repositories;

import org.springframework.data.repository.CrudRepository;

import zorchi.entities.Transfer;

/**
 * JPA {@link Transaction} {@link CrudRepository}.
 */
public interface TransferRepository extends CrudRepository<Transfer, String> {}
