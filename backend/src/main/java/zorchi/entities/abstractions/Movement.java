package zorchi.entities.abstractions;

import java.util.Date;

import javax.persistence.MappedSuperclass;

import org.springframework.lang.Nullable;

/**
 * Astrazione di un generico movimento bancario.
 */
@MappedSuperclass
 public abstract class Movement extends AbstractEntity {
  /**
   * Ammontare coinvolto.
   */
  private final float AMOUNT;
	/**
	 * {@link Date Data} in cui è stato effettuato il movimento.
	 */
	private final Date DATE;

  /**
   * @param UUID - UUID usato per identificare univocamente il movimento.
   * @param amount - ammontare coinvolto.
   */
  protected Movement(String UUID, float amount) {
    super(UUID);
    this.DATE = new Date();
    this.AMOUNT = amount;
  }
  
  /**
	 * Restituisce l'ammontare coinvolto.
   * 
	 * @return {@link #AMOUNT}.
	 */
	public float getAmount() {
    return AMOUNT;
  }

	/**
	 * Restituisce la {@link Date Data} in cui si è stato effettuato il movimento.
   * 
	 * @return {@link #DATE}.
	 */
	public Date getDate() {
		return DATE;
	}

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = super.hashCode();
    result = prime * result + Float.floatToIntBits(AMOUNT);
    result = prime * result + ((DATE == null) ? 0 : DATE.hashCode());
    return result;
  }

  @Override
  public String toString() {
    return super.toString() + ", AMOUNT=" + AMOUNT + ", DATE=" + DATE;
  }

  /**
   * Dati di un generico movimento bancario
   * <p>
   * Se {@link GenericMovement#getSender() sender} e {@link GenericMovement#getRecipient() recipient} sono nulli
   * allora il movimento è una {@link zorchi.entities.Transaction Transazione}, altrimenti si tratta di un {@link zorchi.entities.Transfer Trasferimento}.
   */
  public static interface GenericMovement {
    /**
     * ID del movimento.
     * 
     * @return ID del movimento.
     */
    String getUUID();
    /**
     * Ammontare coinvolto.
     * 
     * @return Ammontare coinvolto.
     */
    float getAmount();
    /**
     * Data in cui è stato eseguito il movimento.
     * 
     * @return Data in cui è stato eseguito il movimento.
     */
    Date getDate();
    /**
     * Mittente del movimento, null se il movimento è una {@link zorchi.entities.Transaction Transazione}.
     * 
     * @return Mittente del movimento.
     */
    @Nullable
    String getSender();
    /**
     * Destinatario del movimento, null se il movimento è una {@link zorchi.entities.Transaction Transazione}.
     * 
     * @return Destinatario del movimento.
     */
    @Nullable
    String getRecipient();
  }
}
