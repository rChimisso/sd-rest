package zorchi.responses.bodies;

/**
 * Generica Response Body.
 */
public class GenericResponseBody {
  /**
   * Messaggio da mostrare a Frontend.
   */
  private final String message;

  /**
   * @param message - messaggio da mostrare a Frontend.
   */
  public GenericResponseBody(String message) {
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
