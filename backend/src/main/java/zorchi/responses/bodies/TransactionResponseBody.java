package zorchi.responses.bodies;

import zorchi.responses.models.MovementActor;
import zorchi.utility.StandardUUID;

/**
 * Dati per il corpo della risposta di una richiesta di Transazione.
 */
public class TransactionResponseBody extends IndexableResponseBody {
  /**
   * {@link MovementActor}.
   */
  private final MovementActor movementActor;
  
  /**
   * @param newBalance - {@link #newBalance}.
   * @param transactionId - {@link #transactionId}.
   */
  public TransactionResponseBody(double newBalance, String transactionId, String accountId) {
    super(transactionId, newBalance >= 0 && !StandardUUID.isInvalid(transactionId) ? Messages.SUCCESS.get() : Messages.FAILURE.get());
    this.movementActor = new MovementActor(accountId, newBalance);
  }

  /**
   * Restituisce il {@link #movementActor MovementActor}.
   * 
   * @return {@link #movementActor}.
   */
  public MovementActor getMovementActor() {
    return movementActor;
  }

  /**
   * Possibli messaggi da mostrare a Frontend.
   */
  static enum Messages {
    SUCCESS("Transazione eseguita con successo."),
    FAILURE("Transazione non eseguita: il bilancio è inferiore a quanto richiesto.");

    /**
     * Messaggio.
     */
    private final String message;

    /**
     * @param message - messaggio.
     */
    Messages(String message) {
      this.message = message;
    }

    /**
     * Restituisce il valore del messaggio.
     * 
     * @return {@link #message}.
     */
    public String get() {
      return this.message;
    }

    @Override
    public String toString() {
      return this.message;
    }
  }
}
