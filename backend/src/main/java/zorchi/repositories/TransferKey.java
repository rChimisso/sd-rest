package zorchi.repositories;

import java.io.Serializable;




//@Embeddable
public class TransferKey implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6017920372411140933L;

	//@Column(name = "to_id")
	private final String to;
	
	//@Column(name = "from_id")
	private final String from;
	
	
	
	public TransferKey(String to, String from) {
		super();
		this.to = to;
		this.from = from;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	public String getTo() {
		return to;
	}


	public String getFrom() {
		return from;
	}


	@Override
	public boolean equals(Object obj) {
		
        if (obj == this) {
            return true;
        }
 
   
        if (!(obj instanceof TransferKey)) {
            return false;
        }
         
       
        TransferKey t  = (TransferKey) obj;
         
        // Compare the data members and return accordingly
        return this.to.equals(t.to) && this.from.equals(t.from);
               
	}
	
	
	@Override
	public int hashCode() {
		int result = 17;
        result = 31 * result + to.hashCode();
        result = 31 * result + from.hashCode();
        return result;
	}
}
