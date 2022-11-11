package zorchi.entities;

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
    assert account1.getBalance() == 0;
    assert account2.getBalance() == 100;
  }

  @Test
  void testCanTransfer() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    assert account1.canTransfer(100) == false;
    assert account2.canTransfer(-100) == true;
  }

  @Test
  void testDelete() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    account1.delete();
    account2.delete();
    assert account1.isValid() == false;
    assert account2.isValid() == false;

  }

  @Test
  void testEquals() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    assert account1.equals(account2) == false;
    assert account2.equals(account1) == false;

  }

  @Test
  void testGetBalance() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    assert account1.getBalance() == 0;
    assert account2.getBalance() == 0;

  }

  @Test
  void testGetName() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    assert account1.getName().equals("Mario");
    assert account2.getName().equals("Luigi");

  }

  @Test
  void testGetSurname() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    assert account1.getSurname().equals("Rossi");
    assert account2.getSurname().equals("Verdi");

  }

  @Test
  void testHashCode() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    assert account1.hashCode() == account2.hashCode();

  }

  @Test
  void testIsDeleted() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    account1.delete();
    assert account1.isDeleted() == true;
    assert account2.isDeleted() == false;

  }

  @Test
  void testIsValid() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), StandardUUID.INVALID_UUID);
    assert account1.isValid() == true;
    assert account2.isValid() == false;

  }

  @Test
  void testSetBalance() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    account1.setBalance(100);
    account2.setBalance(-100);
    assert account1.getBalance() == 100;
    assert account2.getBalance() == -100;

  }

  @Test
  void testSetName() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    account1.setName("Giovanni");
    account2.setName("Giuseppe");
    assert account1.getName().equals("Giovanni");
    assert account2.getName().equals("Giuseppe");

  }

  @Test
  void testSetSurname() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    account1.setSurname("Bianchi");
    account2.setSurname("Neri");
    assert account1.getSurname().equals("Bianchi");
    assert account2.getSurname().equals("Neri");

  }

  @Test
  void testToString() {
    Account account1 = new Account(new AccountData("Mario", "Rossi"), "12345678901234567890123456789012");
    Account account2 = new Account(new AccountData("Luigi", "Verdi"), "01234567890123456789012345678901");
    assert account1.toString().equals("Mario Rossi");
    assert account2.toString().equals("Luigi Verdi");

  }
}
