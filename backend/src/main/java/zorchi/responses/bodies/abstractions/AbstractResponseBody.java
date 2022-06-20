package zorchi.responses.bodies.abstractions;

/**
 * Generica Response Body.
 */
public abstract class AbstractResponseBody {
  /**
   * Messaggio da mostrare a Frontend.
   */
  private final String message;

  /**
   * @param message - messaggio da mostrare a Frontend.
   */
  protected AbstractResponseBody(String message) {
    this.message = message;
  }

  /**
   * Restituisce il {@link #message messaggio} da mostrare a Frontend.
   * 
   * @return {@link #message}.
   */
  public String getMessage() {
    return message;
  }
}
