package zorchi.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import zorchi.entities.Account.AccountData;
import zorchi.utility.StandardUUID;

public class AccountTest {
  @Test
  void testBalanceTransfer() {
    // UUID 32 caratteri esadecimali
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    account1.balanceTransfer(-100);
    account2.balanceTransfer(100);
    Double balance1 = account1.getBalance();
    Double balance2 = account2.getBalance();
    assertEquals(0.0, balance1);
    assertEquals(100.0, balance2);
  }

  @Test
  void testCanTransfer() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    assertFalse(account1.canTransfer(100));
    assertTrue(account2.canTransfer(-100));
  }

  @Test
  void testDelete() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    account1.delete();
    assertFalse(account1.isValid());
    assertTrue(account2.isValid());

  }

  @Test
  void testEquals() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    assertNotEquals(account1, account2);
    assertNotEquals(account2, account1);

  }

  @Test
  void testGetBalance() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Double balance1 = account1.getBalance();
    assertEquals(0.0, balance1);

  }

  @Test
  void testGetName() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    assertEquals("Mario", account1.getName());
    assertEquals("Luigi", account2.getName());

  }

  @Test
  void testGetSurname() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    assertEquals("Rossi", account1.getSurname());
    assertEquals("Verdi", account2.getSurname());

  }

  @Test
  void testHashCode() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    assertEquals(account1.hashCode(), account2.hashCode());

  }

  @Test
  void testIsDeleted() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    account1.delete();
    assertTrue(account1.isDeleted());
    assertFalse(account2.isDeleted());

  }

  @Test
  void testIsValid() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), StandardUUID.INVALID_UUID);
    assertTrue(account1.isValid());
    assertFalse(account2.isValid());

  }

  @Test
  void testSetBalance() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    account1.setBalance(100);
    account2.setBalance(-100);
    Double balance1 = account1.getBalance();
    Double balance2 = account2.getBalance();
    assertEquals(100.0, balance1);
    assertEquals(-100.0, balance2);

  }

  @Test
  void testSetName() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    account1.setName("Giovanni");
    account2.setName("Giuseppe");

    assertEquals("Giovanni", account1.getName());
    assertEquals("Giuseppe", account2.getName());

  }

  @Test
  void testSetSurname() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    account1.setSurname("Bianchi");
    account2.setSurname("Neri");
    assertEquals("Bianchi", account1.getSurname());
    assertEquals("Neri", account2.getSurname());

  }

  @Test
  void testToString() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");

    assertEquals(
        "Account [UUID=12345678901234567890123456789012, balance=0.0, deleted=false, name=Mario, surname=Rossi]",
        account1.toString());
    assertEquals(
        "Account [UUID=01234567890123456789012345678901, balance=0.0, deleted=false, name=Luigi, surname=Verdi]",
        account2.toString());

  }
}
