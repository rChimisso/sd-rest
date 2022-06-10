package zorchi.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.springframework.lang.NonNull;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Account bancario.
 */
@Entity
public class Account {
  /**
   * Nome del proprietario dell'account.
   */
  @NonNull
  private String name;
  /**
   * Cognome del proprietario dell'account.
   */
  @NonNull
  private String surname;
  /**
   * ID dell'account.
   */
  @Id
  @NonNull
  private final String ID;

  /**
   * @param name - {@link #name nome}, passabile come proprietà {@code "name"} di un JSON.
   * @param surname - {@link #surname cognome}, passabile come proprietà {@code "surname"} di un JSON.
   */
  public Account(@JsonProperty("name") String name, @JsonProperty("surname") String surname) {
		this.name = name;
		this.surname = surname;
    this.ID = "";
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
}
