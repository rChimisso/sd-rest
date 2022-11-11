package zorchi.utility;

import java.util.Random;
import java.util.function.Predicate;

/**
 * Wrapper di utility per la generazione di UUID a 10 byte (80 bit, 20 hex).
 */
public class ShortUUID {
  /**
   * Random generator.
   */
  private static final Random RANDOM = new Random();
  /**
   * Lunghezza in byte di uno ShortUUID.
   */
  private static final int BYTES = 10;

  private final String shortUUID;

  /**
   * Costruttore.
   * 
   * @param shortUUID - ShortUUID da utilizzare.
   */
  public ShortUUID(String shortUUID) {
    this.shortUUID = shortUUID;
  }

  /**
   * Costruttore.
   * Randomizza un ShortUUID.
   */
  public ShortUUID(Predicate<String> duplicated) {
    this.shortUUID = ShortUUID.randomShortUUID(duplicated);
  }

  /**
   * Controlla se è un valido ShortUUID.
   * 
   * @param string - stringa da controllare.
   * @return Risultato del controllo.
   */
  public boolean isValidShortUUID() {
    return this.shortUUID.matches("[A-Fa-f0-9]{20}");
  }

  /**
   * Getter
   */
  public String getShortUUID() {
    return this.shortUUID;
  }

  /**
   * Restituisce una stringa rappresentante uno ShortUUID, assicurandosi che non
   * sia duplicato in base al {@link Predicate predicato} passato.
   * 
   * @param duplicated - {@link Predicate} per il controllo della duplicazione.
   * @return ShortUUID sottoforma di stringa.
   */
  private static String randomShortUUID(Predicate<String> duplicated) {
    String shortUUID;
    do {
      byte[] bytes = new byte[BYTES];
      RANDOM.nextBytes(bytes);
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