package zorchi.utility;

import org.springframework.stereotype.Service;

/**
 * Utilità per gestire numeri che rappresentano currency.
 */
@Service
public class Currency {
  /**
   * Somma correttamente due valori monetari.
   * <p>
   * Impedisce che la rappresentazione floating point dei due valori faccia
   * comparire un errore durante la somma.
   * 
   * @param value1 - primo valore da sommare.
   * @param value2 - secondo valore da sommare.
   * @return somma dei due valori.
   */
  public double sum(double value1, double value2) {
    return (value1 * 100 + value2 * 100) / 100;
  }

  /**
   * Sottrae correttamente due valori monetari.
   * <p>
   * Impedisce che la rappresentazione floating point dei due valori faccia
   * comparire un errore durante la sottrazione.
   * 
   * @param value1 - primo valore da sottrarre.
   * @param value2 - secondo valore da sottrarre.
   * @return differenza dei due valori.
   */
  public double sub(double value1, double value2) {
    return (value1 * 100 - value2 * 100) / 100;
  }
}
