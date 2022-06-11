package zorchi.utility;

import java.util.Random;
import java.util.UUID;
import java.util.function.Predicate;

/**
 * Wrapper di utility per la generazione di {@link UUID} a 16 byte (128 bit, 32 hex).
 */
public class StandardUUID {
  /**
   * Valore di invalidità di un qualsiasi UUID.
   */
  public static final String INVALID_UUID = "-1";

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
   * Restituisce una stringa rappresentante un {@link UUID}, assicurandosi che non sia duplicato in base al {@link Predicate predicato} passato.
   * 
   * @param duplicated - {@link Predicate} per il controllo della duplicazione.
   * @return {@link UUID} sottoforma di stringa.
   */
  public static String randomUUID(Predicate<String> duplicated) {
    String standardUUID = UUID.randomUUID().toString().replace("-", "");
    while (duplicated.test(standardUUID)) {
      standardUUID = UUID.randomUUID().toString().replace("-", "");
    }
    return standardUUID;
  }

  /**
   * Wrapper di utility per la generazione di UUID a 10 byte (80 bit, 20 hex).
   */
  public class ShortUUID {
    /**
     * Lunghezza in byte di uno ShortUUID.
     */
    private static final int BYTES = 10;

    /**
     * Restituisce una stringa rappresentante uno ShortUUID, assicurandosi che non sia duplicato in base al {@link Predicate predicato} passato.
     * 
     * @param duplicated - {@link Predicate} per il controllo della duplicazione.
     * @return ShortUUID sottoforma di stringa.
     */
    public static String randomShortUUID(Predicate<String> duplicated) {
      String shortUUID;
      do {
        byte[] bytes = new byte[BYTES];
        new Random().nextBytes(bytes);
        shortUUID = byteToHex(bytes);
      } while (duplicated.test(shortUUID));
      return shortUUID;
    }
  
    /**
     * Converte una serie di byte in una stringa di caratteri esadecimali.
     * 
     * @param bytes - serie di byte da convertire.
     * @return rappresentazione esadecimale dei byte passati.
     */
    private static String byteToHex(byte[] bytes) {
      String hex = "";
      for (byte byt : bytes) {
        String string = String.format("%02X", byt);
        hex = hex + string;
      }
      return hex;
    }
  }
}

