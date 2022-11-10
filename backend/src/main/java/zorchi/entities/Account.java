package zorchi.entities;

import javax.persistence.Entity;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import zorchi.entities.abstractions.AbstractEntity;
import zorchi.utility.StandardUUID;

/**
 * Account bancario.
 */
@Entity
public class Account extends AbstractEntity {
  /**
   * Nome del proprietario dell'Account.
   */
  private String name;
  /**
   * Cognome del proprietario dell'Account.
   */
  private String surname;
  /**
   * Saldo dell'Account.
   */
  private double balance;
  /**
   * Se l'Account è stato eliminato.
   */
  private boolean deleted = false;
  
  /**
   * Referenza statica per un Account non valido.
   */
  @Transient
  @JsonProperty(access = Access.WRITE_ONLY)
  public static Account INVALID_ACCOUNT = new Account();

  /**
   * Costruttore senza argomenti per il funzionamento di Hibernate.
   */
  public Account() {
    //"name" is marked "@NonNullFields at package level" but is not initialized in this constructor.
    super(StandardUUID.INVALID_UUID);
    this.name = "";
  }

  /**
   * @param accountData - dati dell'Account.
   * @param UUID - Short UUID usato per identificare univocamente l'Account.
   */
  public Account(AccountData accountData, String UUID) {
    super(UUID);
    this.name = accountData.name;
    this.surname = accountData.surname;
    this.balance = 0;
	}

  /**
   * Restituisce il {@link #name nome} del proprietario dell'account.
   * 
   * @return {@link #name nome}.
   */
  public String getName() {
    return name;
  }

  /**
   * Imposta il nuovo valore del {@link #name nome} del proprietario dell'account.
   * 
   * @param name - nuovo {@link #name nome}.
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * Restituisce il {@link #surname cognome} del proprietario dell'account.
   * 
   * @return {@link #surname cognome}.
   */
  public String getSurname() {
    return surname;
  }

  /**
   * Imposta il nuovo valore del {@link #surname cognome} del proprietario dell'account.
   * 
   * @param surname - nuovo {@link #surname cognome}.
   */
  public void setSurname(String surname) {
    this.surname = surname;
  }

  /**
   * Restituisce il {@link #balance saldo} dell'account.
   * 
   * @return {@link #balance saldo}.
   */
  public double getBalance() {
    return balance;
  }
  
  /**
   * Imposta il nuovo valore del {@link #balance saldo} dell'account.
   * 
   * @param balance - nuovo {@link #balance saldo}.
   */
  public void setBalance(double balance) {
    this.balance = balance;
  }

  /**
   * Se l'Account è stato eliminato.
   * 
   * @return {@link #deleted}.
   */
  public boolean isDeleted() {
    return deleted;
  }

  /**
   * Segna l'Account come eliminato.
   */
  public void delete() {
    this.deleted = true;
  }
  
  /**
   * Controlla se questo Account puoi trasferire l'{@code amount} specificato.
   * 
   * @param amount - ammontare da trasferire.
   * @return risultato del controllo.
   */
  @Transient
  public boolean canTransfer(float amount) {
    return this.balance >= amount;
  }

  /**
   * Controlla se l'Account è valido.
   * 
   * @return risultato del controllo.
   */
  @Transient
  @JsonProperty(access = Access.WRITE_ONLY)
  @Override
  public boolean isValid() {
    return super.isValid() && !this.deleted;
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = super.hashCode();
    long temp;
    temp = Double.doubleToLongBits(balance);
    result = prime * result + (int) (temp ^ (temp >>> 32));
    result = prime * result + (deleted ? 1231 : 1237);
    result = prime * result + name.hashCode();
    result = prime * result + surname.hashCode();
    return result;
  }

  @Override
  public String toString() {
    return "Account [" + super.toString() + ", balance=" + balance + ", deleted=" + deleted + ", name=" + name + ", surname=" + surname + "]";
  }

  /**
   * Dati per la creazione di un {@link Account Account bancario}.
   */
  public static class AccountData {
    /**
     * Nome del proprietario dell'account.
     */
    @NotNull
    private final String name;
    /**
     * Cognome del proprietario dell'account.
     */
    @NotNull
    private final String surname;

    /**
     * @param name - {@link #name nome}, passabile come proprietà {@code "name"} di un JSON.
     * @param surname - {@link #surname cognome}, passabile come proprietà {@code "surname"} di un JSON.
     */
    public AccountData(@JsonProperty("name") String name, @JsonProperty("surname") String surname) {
      this.name = name;
      this.surname = surname;
    }

    /**
     * Restituisce il {@link #name nome}.
     * 
     * @return {@link #name}.
     */
    public String getName() {
      return name;
    }

    /**
     * Restituisce il {@link #surname cognome}.
     * 
     * @return {@link #surname}.
     */
    public String getSurname() {
      return surname;
    }
  }
}
