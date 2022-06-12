package zorchi.entities;

import java.util.Date;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonProperty;

import zorchi.utility.StandardUUID;

@Entity
public class Transaction {
  @ManyToOne
  @JoinColumn(name = "SHORT_ID")
  
  
  @OneToMany(mappedBy = "from")
  Set<Transfer> form;
  
  @OneToMany(mappedBy = "to")
  Set<Transfer> to;
  
  
  
  private final Account ACCOUNT;

  @Id
  private final String UUID;

  private final int AMOUNT;

  private final Date DATE;

  public Transaction() {
    this.ACCOUNT = new Account();
    this.UUID = StandardUUID.INVALID_UUID;
    this.AMOUNT = 0;
    this.DATE = new Date();
  }

  public Transaction(TransactionData transactionData, Account account, String UUID) {
    this.AMOUNT = transactionData.amount;
    this.ACCOUNT = account;
    this.UUID = UUID;
    this.DATE = new Date();
    
   
  }

  public Account getACCOUNT() {
    return ACCOUNT;
  }

  public String getUUID() {
    return UUID;
  }

  public int getAMOUNT() {
    return AMOUNT;
  }

  public Date getDate() {
    return DATE;
  }

  public static class TransactionData {
    private final int amount;

    public TransactionData(@JsonProperty("amount") int amount) {
      this.amount = amount;
    }

    public int getAmount() {
      return amount;
    }
  }
}
