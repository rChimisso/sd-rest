package zorchi.responses.bodies;
import org.springframework.http.HttpStatus;

import zorchi.utility.StandardUUID;

/**
 * Dati per il corpo della risposta di una richiesta di trasferimento.
 */
public class TransferResponseBody {
  /**
   * Dati dell'Attore from
   */
  public final TransferActor from;
  
  /**
   * Dati dell'Attore to
   */
  public final TransferActor to;
  
  /**
   * UUID della transferimenti coinvolta.
   */
  public final String transferId;
  
  public final String message;

  /**
   * @param newBalance - {@link #newBalance}.
   * @param transactionId - {@link #transactionId}.
   */
  public TransferResponseBody(long fromBalance, long toBalance, String fromId, String toId, String transferId) {
    this.from = new TransferActor(fromId, fromBalance);
    this.to = new TransferActor(toId, toBalance);
    this.transferId = transferId;
    if (fromBalance >= 0 && !StandardUUID.isInvalid(toId) && !StandardUUID.isInvalid(fromId) && !StandardUUID.isInvalid(transferId)) {
      this.message = HttpStatus.OK.getReasonPhrase();
    } else {
      this.message = "Trasferimento non eseguito: il bilancio è inferiore a quanto richiesto.";
    }
  }
  
  static class TransferActor {
	  private final String id;
	  
	  private final long newBalance;
	  
	  public TransferActor(String id, long fromBalance) {
      this.id = id;
      this.newBalance = fromBalance;
	  }

    public String getId() {
      return id;
    }

    public long getNewBalance() {
      return newBalance;
    }
  }
}
