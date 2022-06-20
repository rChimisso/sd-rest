package zorchi.responses.bodies;

import zorchi.responses.bodies.abstractions.AbstractMovementResponseBody;
import zorchi.responses.models.MovementActor;
import zorchi.utility.StandardUUID;

/**
 * Dati per il corpo della risposta di una richiesta di Trasferimento.
 */
public class TransferResponseBody extends AbstractMovementResponseBody {
  /**
   * {@link MovementActor} mittente.
   */
	private final MovementActor sender;
  /**
   * {@link MovementActor} destinatario.
   */
  private final MovementActor recipient;
  
  /**
   * @param senderBalance - saldo del mittente.
   * @param recipientBalance - saldo del destinatario.
   * @param senderId - id del mittente.
   * @param recipientId - id del destinatario.
   * @param transferId - id del Trasferimento.
   */
  public TransferResponseBody(double senderBalance, double recipientBalance, String senderId, String recipientId, String transferId) {
    super(transferId, StandardUUID.isInvalid(transferId) ? Messages.FAILURE.get() : Messages.SUCCESS.get());
    this.sender = new MovementActor(senderId, senderBalance);
    this.recipient = new MovementActor(recipientId, recipientBalance);
  }
  
  /**
   * Restituisce il {@link #sender MovementActor} mittente.
   * 
   * @return {@link #sender}.
   */
  public MovementActor getSender() {
    return sender;
  }

  /**
   * Restituisce il {@link #recipient MovementActor} destinatario.
   * 
   * @return {@link #recipient}.
   */
  public MovementActor getRecipient() {
    return recipient;
  }

  /**
   * Possibli messaggi da mostrare a Frontend.
   */
  public static enum Messages {
    SUCCESS("Trasferimento eseguito con successo."),
    FAILURE("Trasferimento non eseguito: il bilancio è inferiore a quanto richiesto.");

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
