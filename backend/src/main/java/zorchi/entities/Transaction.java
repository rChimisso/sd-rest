package zorchi.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.lang.NonNull;

import com.fasterxml.jackson.annotation.JsonProperty;

import zorchi.utility.StandardUUID;

@Entity
public class Transaction {
  @ManyToOne
  @JoinColumn(name = "SHORT_UUID")
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

  public static class TransactionFullData implements TransactionFullDataInterface {
    @NonNull
    private final String UUID;

    @NonNull
    private final int amount;

    @NonNull
    private final Date DATE;

    private final String sender;

    private final String recipient;

    public TransactionFullData(
        @JsonProperty("UUID") String UUID,
        @JsonProperty("amount") int amount,
        @JsonProperty("DATE") Date date,
        @JsonProperty("sender") String sender,
        @JsonProperty("recipient") String recipient) {
      this.UUID = UUID;
      this.amount = amount;
      this.DATE = date;
      this.sender = sender;
      this.recipient = recipient;
    }

    public String getUUID() {
      return UUID;
    }

    public int getAmount() {
      return amount;
    }

    public Date getDATE() {
      return DATE;
    }

    public String getSender() {
      return sender;
    }

    public String getRecipient() {
      return recipient;
    }
  }

  public interface TransactionFullDataInterface {
    String getUUID();

    int getAmount();

    Date getDATE();

    String getSender();

    String getRecipient();
  }
}
