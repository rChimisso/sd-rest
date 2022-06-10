package zorchi.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.springframework.lang.NonNull;

import com.fasterxml.jackson.annotation.JsonProperty;

import zorchi.utility.StandardUUID;

/**
 * Account bancario.
 */
@Entity
public class Account {
  /**
   * Nome del proprietario dell'account.
   */
  @NonNull
  protected String name;
  /**
   * Cognome del proprietario dell'account.
   */
  @NonNull
  protected String surname;
  /**
   * ID dell'account.
   * <p>
   * Composto da una sequenza di 20 caratteri esadecimali rappresentanti una sequenza di 10 byte (80 bit).
   */
  @Id
  @NonNull
  private final String ID;

  /**
   * Costruttore senza argomenti per il funzionamento di Hibernate.
   */
  public Account() {
    this.ID = StandardUUID.INVALID_UUID;
  }

  /**
   * @param name - {@link #name nome}.
   * @param surname - {@link #surname cognome}.
   * @param ID - {@link #ID}.
   */
  public Account(AccountData accountData, String ID) {
    this.name = accountData.getName();
    this.surname = accountData.getSurname();
    this.ID = ID;
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
   * Restituisce il {@link #surname cognome} del proprietario dell'account.
   * 
   * @return {@link #surname cognome}.
   */
  public String getSurname() {
    return surname;
  }

  /**
   * Restituisce l'{@link #ID} dell'account.
   * 
   * @return {@link #ID}.
   */
  public String getID() {
    return ID;
  }

  /**
   * Controlla se questo account è valido.
   * 
   * @return risultato del controllo.
   */
  public boolean isValid() {
    return !ID.equals(StandardUUID.INVALID_UUID);
  }

  @Override
  public boolean equals(Object obj) {
    return this == obj || (obj != null && getClass() == obj.getClass() && ID.equals(((Account) obj).ID));
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ID.hashCode();
    result = prime * result + name.hashCode();
    result = prime * result + surname.hashCode();
    return result;
  }

  @Override
  public String toString() {
    return "Account [ID=" + ID + ", name=" + name + ", surname=" + surname + "]";
  }

  /**
   * Dati per la creazione di un {@link zorchi.entities.Account Account bancario}.
   */
  public class AccountData {
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
}
