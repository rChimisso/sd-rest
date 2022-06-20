package zorchi.entities;

import java.util.function.Predicate;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import zorchi.entities.Transaction.TransactionData;
import zorchi.entities.abstractions.Movement;
import zorchi.utility.StandardUUID;

/**
 * Trasferimento bancario da un {@link Account Account bancario} a un altro.
 */
@Entity
public class Transfer extends Movement {
	/**
	 * Transazione del mittente.
	 */
	@ManyToOne()
  @JoinColumn(name = "SENDER_TRANSACTION")
	private final Transaction SENDER_TRANSACTION;
  /**
	 * Transazione del destinatario.
	 */
	@ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "RECIPIENT_TRANSACTION")
	private final Transaction RECIPIENT_TRANSACTION;
	
  /**
   * Referenza statica per un Trasferimento non valido.
   */
  @Transient
  @JsonProperty(access = Access.WRITE_ONLY)
  public static Transfer INVALID_TRANSFER = new Transfer();

  /**
   * Costruttore senza argomenti per il funzionamento di Hibernate.
   */
  public Transfer() {
    super(StandardUUID.INVALID_UUID, 0);
    this.RECIPIENT_TRANSACTION = Transaction.INVALID_TRANSACTION;
    this.SENDER_TRANSACTION = Transaction.INVALID_TRANSACTION;
  }
	
  /**
   * @param sender - {@link Account Account bancario} del mittente.
   * @param recipient - {@link Account Account bancario} del destinatario.
   * @param amount - ammontare del trasferimento.
   * @param duplicated - {@link Predicate predicato} di duplicazione degli UUID per le {@link Transaction Transazioni}.
   * @param UUID - Standard UUID usato per identificare univocamente il Trasferimento.
   */
	public Transfer(Account sender, Account recipient, float amount, Predicate<String> duplicated, String UUID) {
    super(sender.canTransfer(Math.abs(amount)) ? UUID : StandardUUID.INVALID_UUID, sender.canTransfer(Math.abs(amount)) ? Math.abs(amount) : 0);
		float actualAmount = sender.canTransfer(Math.abs(amount)) ? Math.abs(amount) : 0;
    this.SENDER_TRANSACTION = new Transaction(new TransactionData(-actualAmount), sender, StandardUUID.randomUUID(duplicated));
    this.RECIPIENT_TRANSACTION = new Transaction(new TransactionData(actualAmount), recipient, StandardUUID.randomUUID(duplicated));
	}
	
  /**
	 * Restituisce la {@link Transaction Transazione} del mittente.
   * 
	 * @return {@link #SENDER_TRANSACTION}.
	 */
	public Transaction getSenderTransaction() {
		return SENDER_TRANSACTION;
	}

  /**
	 * Restituisce la {@link Transaction Transazione} del destinatario.
   * 
	 * @return {@link #RECIPIENT_TRANSACTION}.
	 */
	public Transaction getRecipientTransaction() {
		return RECIPIENT_TRANSACTION;
	}

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = super.hashCode();
    result = prime * result + ((RECIPIENT_TRANSACTION == null) ? 0 : RECIPIENT_TRANSACTION.hashCode());
    result = prime * result + ((SENDER_TRANSACTION == null) ? 0 : SENDER_TRANSACTION.hashCode());
    return result;
  }

  @Override
  public String toString() {
    return "Transfer [" + super.toString() + ", RECIPIENT_TRANSACTION=" + RECIPIENT_TRANSACTION + ", SENDER_TRANSACTION=" + SENDER_TRANSACTION + "]";
  }

  /**
   * Dati per la creazione di un {@link Transfer Trasferimento}.
   */
	public static class TransferData {
    /**
     * Ammontare coinvolto.
     */
    @NotNull
    private final float amount;
    /**
     * UUID dell'{@link Account Account bancario} del mittente.
     */
    @NotNull
    private final String from;
    /**
     * UUID dell'{@link Account Account bancario} del destinatario.
     */
    @NotNull
    private final String to;

    /**
     * @param amount - ammontare coinvolto.
     * @param from - UUID dell'{@link Account Account bancario} del mittente.
     * @param to - UUID dell'{@link Account Account bancario} del destinatario.
     */
    public TransferData(@JsonProperty("amount") float amount, @JsonProperty("from") String from, @JsonProperty("to") String to) {
      this.amount = amount;
      this.from = from;
      this.to = to;
    }

    /**
     * Restituisce l'ammontare coinvolto.
     * 
     * @return {@link #amount}.
     */
    public float getAmount() {
      return amount;
    }
    
    /**
     * Restituisce l'UUID dell'{@link Account Account bancario} del mittente.
     * 
     * @return {@link #from}.
     */
    public String getFrom() {
      return from;
    }

    /**
     * Restituisce l'UUID dell'{@link Account Account bancario} del destinatario.
     * 
     * @return {@link #to}.
     */
    public String getTo() {
      return to;
    }
  }
	
  /**
   * Dati per il divert di un {@link Transfer Trasferimento}.
   */
	public static class TransferDivertData {
    /**
     * UUID del {@link Transfer Trasferimento} di cui fare il divert.
     */
    @NotNull
    private final String id;

    /**
     * @param id - UUID del {@link Transfer Trasferimento} di cui fare il divert.
     */
    public TransferDivertData(@JsonProperty("id") String id) {
      this.id = id; 
    }

    /**
     * Restituisce l'UUID del {@link Transfer Trasferimento} di cui fare il divert.
     * 
     * @return - {@link #id}.
     */
    public String getId() {
      return id;
    }
	}
}
