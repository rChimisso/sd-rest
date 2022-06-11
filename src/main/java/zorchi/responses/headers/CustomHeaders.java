package zorchi.responses.headers;

import java.util.List;
import java.util.Map;

import org.springframework.util.LinkedMultiValueMap;

/**
 * Utility per la generazione di header custom.
 */
public abstract class CustomHeaders {
  public static LinkedMultiValueMap<String, String> getXSistemaBancarioHeader(String name, String surname) {
    return getCustomHeader("X-Sistema-Bancario", name + ";" + surname);
  }

  /**
   * Genera un header data la {@code key} e il singolo {@code value}.
   * 
   * @param key - chiave dell'header.
   * @param value - valore dell'header.
   * @return {@link LinkedMultiValueMap} per l'header di una {@link org.springframework.http.ResponseEntity ResponseEntity}.
   */
  public static LinkedMultiValueMap<String, String> getCustomHeader(String key, String value) {
    return new LinkedMultiValueMap<>(Map.of(key, List.of(value)));
  }
}
