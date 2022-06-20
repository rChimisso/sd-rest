package zorchi.responses.models;

/**
 * Dati rilevanti di un {@link zorchi.entities.Account Account bancario} al seguito di un movimento che ne modifica il {@link zorchi.entities.Account#balance saldo}.
 */
public class MovementActor {
  /**
   * ID dell'Account.
   */
  private final String id;
  /**
   * Nuovo saldo dell'Account.
   */
  private final double newBalance;
  
  /**
   * @param id - ID dell'Account.
   * @param newBalance - nuovo saldo dell'Account.
   */
  public MovementActor(String id, double newBalance) {
    this.id = id;
    this.newBalance = newBalance;
  }

  /**
   * Restituisce l'{@link #id} dell'Account.
   * 
   * @return {@link #id}
   */
  public String getId() {
    return id;
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
