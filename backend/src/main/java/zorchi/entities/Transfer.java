package zorchi.entities;

import java.util.Date;
import java.util.function.Predicate;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import com.fasterxml.jackson.annotation.JsonProperty;

import zorchi.entities.Transaction.TransactionData;
import zorchi.utility.StandardUUID;

@Entity
public class Transfer {
	
	@EmbeddedId
	private final String UUID;
	
	/**
	 * Transazione del ricevente
	 */
	@ManyToOne
    @MapsId("toId")
    @JoinColumn(name = "to_id")
	private Transaction to; 
	
	/**
	 * Tranzazione del destinatario
	 */
	@ManyToOne /// vedere come funzionano , sono sbagliate
    @MapsId("fromId")
    @JoinColumn(name = "from_id")
	private Transaction from;

	/**
	 * Data del trasferimento
	 */
	private final Date DATE;
	
	 
	public Transfer( Account to,  Account from,  int amount, Predicate<String> duplicated, String UUID) {
		
		this.DATE = new Date();
		this.UUID = UUID;
		int absAmount = Math.abs(amount);
		
		// Orribile da cambiare
		if(from.getBalance() - absAmount >= 0)
		{
		
			TransactionData f = new TransactionData(absAmount);
			TransactionData t = new TransactionData(-absAmount);
			
			this.to = new Transaction(t ,to ,StandardUUID.randomUUID(duplicated));
			this.from = new Transaction(f ,from ,StandardUUID.randomUUID(duplicated));
			
			
		}else{
			
			TransactionData f = new TransactionData(absAmount);
			TransactionData t = new TransactionData(-absAmount);
			
			this.to = new Transaction(t ,to ,StandardUUID.randomUUID(duplicated));
			this.from = new Transaction(f ,from ,StandardUUID.randomUUID(duplicated));
		}
		
		
		
		
		
	}

	/**
	 * 
	 * @return
	 */
	public Date getDATE() {
		return DATE;
	}

	/**
	 * 
	 * @return
	 */
	public String getUUID() {
		return UUID;
	}

	/**
	 * 
	 * @return
	 */
	public Transaction getTo() {
		return to;
	}

	/**
	 * 
	 * @return
	 */
	public Transaction getFrom() {
		return from;
	}

	 public static class TransferData {
		    private final int amount;
		    private final String from;
		    private final String to;


			public TransferData(@JsonProperty("amount") int amount, @JsonProperty("from") String from, @JsonProperty("to") String to) 
		    {
		      this.amount = amount;
		      this.from = from;
		      this.to = to;
		    }

		    public int getAmount() {
		      return amount;
		    }
		    
		    public String getFrom() {
				return from;
			}

			public String getTo() {
				return to;
			}

		  }
	
}
