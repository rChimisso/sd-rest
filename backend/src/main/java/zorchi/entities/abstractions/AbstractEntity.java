package zorchi.entities.abstractions;

import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import zorchi.utility.StandardUUID;

/**
 * Astrazione di una generica entità.
 */
@MappedSuperclass
public abstract class AbstractEntity {
  /**
   * ID dell'entità.
   * <p>
   * Composto da una sequenza di 20 caratteri esadecimali rappresentanti una sequenza di 10 byte (80 bit)
   * oppure
   * da una sequenza di 32 caratteri esadecimali rappresentanti una sequenza di 16 byte (128 bit).
   */
  @Id
  private final String UUID;

  /**
   * @param UUID - UUID usato per identificare univocamente l'entità.
   */
  protected AbstractEntity(String UUID) {
    this.UUID = UUID;
  }

  /**
   * Restituisce l'{@link #UUID} della Transazione.
   * 
   * @return {@link #UUID}.
   */
  public String getUUID() {
    return UUID;
  }

  /**
   * Controlla se questa entità è valida.
   * 
   * @return risultato del controllo.
   */
  @Transient
  @JsonProperty(access = Access.WRITE_ONLY)
  public boolean isValid() {
    return !StandardUUID.isInvalid(UUID);
  }

  @Override
  public boolean equals(Object obj) {
    return this == obj || (obj != null && getClass() == obj.getClass() && UUID.equals(((AbstractEntity) obj).UUID));
  }

  @Override
  public int hashCode() {
    return 31 + getUUID().hashCode();
  }

  @Override
  public String toString() {
    return "UUID=" + UUID;
  }
}
