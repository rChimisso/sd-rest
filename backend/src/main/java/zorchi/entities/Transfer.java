package zorchi.entities;


import java.util.Date;
import java.util.function.Predicate;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


import com.fasterxml.jackson.annotation.JsonProperty;

import zorchi.entities.Transaction.TransactionData;

import zorchi.utility.StandardUUID;

@Entity
public class Transfer{
	

	
	
	/**
	 * 
	 */
	//@EmbeddedId
	//TransferKey id;
	
	@Id
	final String UUID;
	
	/*
	 * Tassa per il trasferimento / bonifico, per ora è 0
	 */
	private static int tassa = 0;
	
	/**
	 * Transazione del ricevente
	 */
	@ManyToOne
    @JoinColumn(name = "to_id")
	private Transaction to; 
	
	/**
	 * Tranzazione del destinatario
	 */
	@ManyToOne
    @JoinColumn(name = "from_id")
	private Transaction from;

	/**
	 * Data del trasferimento
	 */
	private final Date DATE;
	
	private final int amount;
	
	 
	public Transfer( Account to,  Account from,  int amount, Predicate<String> duplicated, String UUID) {
		
		this.DATE = new Date();
		this.UUID = UUID;
		this.amount = amount;
		int absAmount = Math.abs(amount);
		
		// Orribile da cambiare
		if(from.getBalance() - (absAmount+tassa) >= 0)
		{
		
			TransactionData f = new TransactionData(absAmount+tassa);
			TransactionData t = new TransactionData(-absAmount);
			

		
			this.to = new Transaction(t ,to ,StandardUUID.randomUUID(duplicated));
			this.from = new Transaction(f ,from ,StandardUUID.randomUUID(duplicated));
			
			
		}else{
			
			TransactionData f = new TransactionData(0);
			TransactionData t = new TransactionData(0);
			
			

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
