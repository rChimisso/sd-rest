package zorchi.utility;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

public class StandardUUIDTest {

  @Test
  void testIsInvalid() {
    assertTrue(StandardUUID.isInvalid(StandardUUID.INVALID_UUID));
  }

  @Test
  void testIsValidStandardUUID() {

    assertFalse(StandardUUID.isValidStandardUUID("1234567890"));
  }

  @Test
  void testRandomUUID() {
    assertFalse(StandardUUID.randomUUID(uuid -> false).equals(StandardUUID.INVALID_UUID));

  }
}
