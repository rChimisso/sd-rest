package zorchi.responses.bodies;

/**
 * Response Body di un oggetto indicizzabile tramite id.
 */
public class IndexableResponseBody extends GenericResponseBody {
  /**
   * UUID dell'oggetto della risposta.
   */
  private final String id;

  /**
   * @param id - UUID del movimento.
   * @param message - messaggio da mostrare a Frontend.
   */
  public IndexableResponseBody(String id, String message) {
    super(message);
    this.id = id;
  }

  /**
   * Restituisce l'{@link #id} dell'oggetto della risposta.
   * 
   * @return {@link #id}.
   */
  public String getId() {
    return id;
  }
}
