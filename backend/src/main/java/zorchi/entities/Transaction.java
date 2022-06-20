package zorchi.entities;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import zorchi.entities.abstractions.Movement;
import zorchi.utility.StandardUUID;

/**
 * Transazione bancaria su singolo {@link Account Account bancario}, ovvero un prelievo o un versamento.
 */
@Entity
public class Transaction extends Movement {
  /**
   * {@link Account Account bancario} che ha effettuato la Transazione.
   */
  @ManyToOne()
  @JoinColumn(name = "ACCOUNT_UUID")
  private final Account ACCOUNT;

  /**
   * Referenza statica per una Transazione non valida.
   */
  @Transient
  @JsonProperty(access = Access.WRITE_ONLY)
  public static Transaction INVALID_TRANSACTION = new Transaction();

  /**
   * Costruttore senza argomenti per il funzionamento di Hibernate.
   */
  public Transaction() {
    super(StandardUUID.INVALID_UUID, 0);
    this.ACCOUNT = new Account();
  }

  /**
   * @param transactionData - dati della Transazione.
   * @param account - {@link Account Account bancario} che ha effettuato la Transazione.
   * @param UUID - Standard UUID usato per identificare univocamente la Transazione.
   */
  public Transaction(TransactionData transactionData, Account account, String UUID) {
    super(account.isValid() ? UUID : StandardUUID.INVALID_UUID, account.isValid() ? transactionData.amount : 0);
    this.ACCOUNT = account;
  }

  /**
   * Restituisce l'{@link Account Account bancario} che ha effettuato la Transazione.
   * 
   * @return {@link #ACCOUNT}.
   */
  public Account getAccount() {
    return ACCOUNT;
  }

  @Override
  public int hashCode() {
    return 31 * super.hashCode() + ACCOUNT.hashCode();
  }

  @Override
  public String toString() {
    return "Transaction [" + super.toString() + ", ACCOUNT=" + ACCOUNT + "]";
  }

  /**
   * Dati per la creazione di una {@link Transaction Transazione}.
   */
  public static class TransactionData {
    /**
     * Ammontare coinvolto nella Transazione.
     */
    private final float amount;

    /**
     * @param amount - ammontare coinvolto nella Transazione.
     */
    public TransactionData(@JsonProperty("amount") float amount) {
      this.amount = amount;
    }

    /**
     * Restituisce l'ammontare coinvolto nella Transazione.
     * 
     * @return {@link #amount}.
     */
    public float getAmount() {
      return amount;
    }
  }
}
