package zorchi.responses.bodies;


import zorchi.utility.StandardUUID;

/**
 * Dati per il corpo della risposta di una richiesta di trasferimento.
 */
public class TransferResponseBody {
  /**
   * Dati dell'Attore from
   */
	private final TransferActor from;
  
  /**
   * Dati dell'Attore to
   */
  private final TransferActor to;
  
  /**
   * UUID della transferimenti coinvolta.
   */
  private final String transferId;
  
  /**
   * Messagio front end
   */
  private final String message;
  
  private final boolean performed;

  /**
   * @param newBalance - {@link #newBalance}.
   * @param transactionId - {@link #transactionId}.
   */
  public TransferResponseBody(long fromBalance, long toBalance, String fromId, String toId, String transferId, boolean performed, String message) {
    this.from = new TransferActor(fromId, fromBalance);
    this.to = new TransferActor(toId, toBalance);
    this.transferId = transferId;
    this.performed = performed;
    this.message = message;
    
  }
  
  public TransferResponseBody(long fromBalance, long toBalance, String fromId, String toId, String transferId) {
	    this.from = new TransferActor(fromId, fromBalance);
	    this.to = new TransferActor(toId, toBalance);
	    this.transferId = transferId;
	    this.performed = true;
	    this.message = "Operazione eseguita con sucesso.";
	   
	  }
  
  
  /**
   * Risposta 404, la risposta standart HTTP crea problemi con front end
   */
  public TransferResponseBody() {
	  this(-1, -1, StandardUUID.INVALID_UUID, StandardUUID.INVALID_UUID, StandardUUID.INVALID_UUID, false,"Error");

	  }
  public TransferResponseBody(String message) {
	  this(-1, -1, StandardUUID.INVALID_UUID, StandardUUID.INVALID_UUID, StandardUUID.INVALID_UUID, false, message);

	  }
  
  
  public TransferActor getFrom() {
	return from;
}



public TransferActor getTo() {
	return to;
}



public String getTransferId() {
	return transferId;
}



public String getMessage() {
	return message;
}



public boolean isPerformed() {
	return performed;
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
