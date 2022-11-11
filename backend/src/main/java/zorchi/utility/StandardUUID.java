package zorchi.utility;

import java.util.UUID;
import java.util.function.Predicate;

/**
 * Wrapper di utility per la generazione di {@link UUID} a 16 byte (128 bit, 32
 * hex).
 */
public class StandardUUID {
  /**
   * Valore di invalidità di un qualsiasi UUID.
   */
  public static final String INVALID_UUID = "-1";

  /**
   * Controlla se la stringa passata è conforme ad un valido StandardUUID.
   * 
   * @param string - stringa da controllare.
   * @return Risultato del controllo.
   */
  public static boolean isValidStandardUUID(String string) {
    return string.matches("[A-Fa-f0-9]{32}");
  }

  /**
   * Controlla se l'UUID passato è {@link #INVALID_UUID}.
   * 
   * @param uuid - UUID da controllare.
   * @return risultato del controllo.
   */
  public static final boolean isInvalid(String uuid) {
    return uuid.equals(INVALID_UUID);
  }

  /**
   * Restituisce una stringa rappresentante un {@link UUID}, assicurandosi che non
   * sia duplicato in base al {@link Predicate predicato} passato.
   * 
   * @param duplicated - {@link Predicate} per il controllo della duplicazione.
   * @return {@link UUID} sottoforma di stringa.
   */
  public static String randomUUID(Predicate<String> duplicated) {
    String standardUUID = UUID.randomUUID().toString().replace("-", "").toUpperCase();
    while (duplicated.test(standardUUID)) {
      standardUUID = UUID.randomUUID().toString().replace("-", "").toUpperCase();
    }
    return standardUUID;
  }

}
