package zorchi.responses.bodies;

import java.util.List;

import zorchi.entities.Account;
import zorchi.entities.abstractions.Movement.GenericMovement;

/**
 * Dati per il corpo della risposta di una richiesta dello storico di un {@link Account Account bancario}.
 */
public class AccountHistoryResponseBody extends GenericResponseBody {
  /**
   * {@link Account Account bancario}.
   */
  private final Account account;
  /**
   * Cronologia di tutti i movimenti.
   */
  private final List<GenericMovement> history;

  /**
   * @param account - {@link Account Account bancario}.
   * @param transfers - cronologia di tutti i movimenti.
   */
  public AccountHistoryResponseBody(Account account, List<GenericMovement> transfers) {
    super("Storico dell'account recuperato con successo.");
    this.account = account;
    this.history = transfers;
  }

  /**
   * Restituisce l'{@link Account Account bancario}.
   * 
   * @return {@link #account}.
   */
  public Account getAccount() {
    return account;
  }

  /**
   * Restituisce la cronologia di tutti i movimenti.
   * 
   * @return {@link #history}.
   */
  public List<GenericMovement> getHistory() {
    return history;
  }
}
