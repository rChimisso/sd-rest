package zorchi.responses.bodies.abstractions;

/**
 * Generica Response Body di un movimento bancario.
 */
public abstract class AbstractMovementResponseBody extends AbstractResponseBody {
  /**
   * UUID del movimento.
   */
  private final String id;

  /**
   * @param id - UUID del movimento.
   * @param message - messaggio da mostrare a Frontend.
   */
  protected AbstractMovementResponseBody(String id, String message) {
    super(message);
    this.id = id;
  }

  /**
   * Restituisce l'{@link #id} del movimento.
   * 
   * @return {@link #id}.
   */
  public String getId() {
    return id;
  }
}
