package zorchi.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;

import org.springframework.lang.NonNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import zorchi.entities.Transaction.TransactionFullDataInterface;
import zorchi.utility.StandardUUID;

/**
 * Account bancario.
 */
@Entity
public class Account {
  /**
   * Nome del proprietario dell'account.
   */
  private String name;
  /**
   * Cognome del proprietario dell'account.
   */
  private String surname;
  /**
   * Saldo dell'account.
   */
  private long balance;
  /**
   * ID dell'account.
   * <p>
   * Composto da una sequenza di 20 caratteri esadecimali rappresentanti una sequenza di 10 byte (80 bit).
   */
  @Id
  private final String SHORT_UUID;

  /**
   * Costruttore senza argomenti per il funzionamento di Hibernate.
   */
  public Account() {
    this.SHORT_UUID = StandardUUID.INVALID_UUID;
  }

  /**
   * @param accountData - dati dell'account.
   * @param ID - 
   */
  public Account(AccountData accountData, String ID) {
    this.name = accountData.name;
    this.surname = accountData.surname;
    this.balance = 0;
    this.SHORT_UUID = ID;
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
  public long getBalance() {
    return balance;
  }
  
  /**
   * Imposta il nuovo valore del {@link #balance saldo} dell'account.
   * 
   * @param balance - nuovo {@link #balance saldo}.
   */
  public void setBalance(long balance) {
    this.balance = balance;
  }

  /**
   * Restituisce l'{@link #SHORT_UUID} dell'account.
   * 
   * @return {@link #SHORT_UUID}.
   */
  public String getID() {
    return SHORT_UUID;
  }
  
  /**
   * Controlla se questo account puoi trasferire l'{@code amount} specificato.
   * 
   * @param amount - ammontare da trasferire.
   * @return risultato del controllo.
   */
  @Transient
  public boolean canTransfer(int amount) {
    return this.balance >= amount;
  }

  /**
   * Controlla se questo account è valido.
   * 
   * @return risultato del controllo.
   */
  @Transient
  @JsonProperty(access = Access.WRITE_ONLY)
  public boolean isValid() {
    return !StandardUUID.isInvalid(SHORT_UUID);
  }

  @Override
  public boolean equals(Object obj) {
    return this == obj || (obj != null && getClass() == obj.getClass() && SHORT_UUID.equals(((Account) obj).SHORT_UUID));
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + SHORT_UUID.hashCode();
    result = prime * result + name.hashCode();
    result = prime * result + surname.hashCode();
    return result;
  }

  @Override
  public String toString() {
    return "Account [ID=" + SHORT_UUID + ", name=" + name + ", surname=" + surname + "]";
  }
  
  public static boolean goodRequest(String request)
  {
	  
	  return request.matches("[A-Fa-f0-9]{20}");
		  
  }

  /**
   * Dati per la creazione di un {@link zorchi.entities.Account Account bancario}.
   */
  public static class AccountData {
    /**
     * Nome del proprietario dell'account.
     */
    @NonNull
    private final String name;
    /**
     * Cognome del proprietario dell'account.
     */
    @NonNull
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
  
  public static class AccountFullData {
    private final Account account;
    private final List<TransactionFullDataInterface> history;

    public AccountFullData(Account account, List<TransactionFullDataInterface> transfers) {
      this.account = account;
      this.history = transfers;
    }

    public Account getAccount() {
      return account;
    }

    public List<TransactionFullDataInterface> getHistory() {
      return history;
    }
    
   
  }
}
