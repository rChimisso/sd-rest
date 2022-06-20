package zorchi.responses.models;

/**
 * Dati rilevanti di un {@link zorchi.entities.Account Account bancario} al seguito di un movimento che ne modifica il {@link zorchi.entities.Account#balance saldo}.
 */
public class MovementActor {
  /**
   * ID dell'Account.
   */
  private final String UUID;
  /**
   * Nuovo saldo dell'Account.
   */
  private final double newBalance;
  
  /**
   * @param id - ID dell'Account.
   * @param newBalance - nuovo saldo dell'Account.
   */
  public MovementActor(String id, double newBalance) {
    this.UUID = id;
    this.newBalance = newBalance;
  }

  /**
   * Restituisce l'{@link #UUID} dell'Account.
   * 
   * @return {@link #UUID}
   */
  public String getUUID() {
    return UUID;
  }

  /**
   * Restituisce il {@link #newBalance nuovo saldo} dell'Account.
   * 
   * @return {@link #newBalance}.
   */
  public double getNewBalance() {
    return newBalance;
  }
}
