package zorchi.responses.bodies;

import org.springframework.http.HttpStatus;

import zorchi.utility.StandardUUID;

/**
 * Dati per il corpo della risposta di una richiesta di transazione.
 */
public class TransactionResponseBody {
  /**
   * Nuovo saldo del conto coinvolto.
   */
  public final long newBalance;
  /**
   * UUID della transazione coinvolta.
   */
  public final String transactionId;

  public final String message;

  /**
   * @param newBalance - {@link #newBalance}.
   * @param transactionId - {@link #transactionId}.
   */
  public TransactionResponseBody(long newBalance, String transactionId) {
    this.newBalance = newBalance;
    this.transactionId = transactionId;
    if (newBalance >= 0 && !StandardUUID.isInvalid(transactionId)) {
      this.message = HttpStatus.OK.getReasonPhrase();
    } else {
      this.message = "Transaction failed: account balance was less than required.";
    }
  }
}
