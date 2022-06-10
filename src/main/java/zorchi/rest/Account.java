package zorchi.rest;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Account {
	
	private ID id;
	private String name;
	private String surname;
	
	
	
	
	
	private static boolean saveAccount(Account account) {
		
		 // salva l'account nel sistema
			
			return true;
				
		}
	
	public Account(@JsonProperty("name") String name, @JsonProperty("surname") String surname) {
		
		this.name = name;
		this.surname = surname;
		
		this.id = new ID();
		
		saveAccount(this);
		
		
	}
	
	
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	
	public ID getId() {
		return id;
	}
	
	
	

}
