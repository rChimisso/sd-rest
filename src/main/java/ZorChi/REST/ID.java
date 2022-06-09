package ZorChi.REST;


import java.util.Random;


public class ID {
	
	private static final int SIZE = 20; 
	
	private String id;
	
	public ID() {
		
		this.id = generateValidId(); 
			
		}

	//Non sono riuscito ad importare classi con metodi già costruiti
	private static String byteToHex(byte[] bytes) 
	{
	
		String hex = "";
		for (byte b : bytes) {
			String st = String.format("%02X", b);
			hex = hex + st;
		}
		return hex;
	}
	

	private static String generateValidId() {
		
		String randomString;
		do {
		byte[] bytes = new byte[SIZE]; 
	    new Random().nextBytes(bytes);
	    
	    System.out.println(bytes);
	    
	    randomString = byteToHex(bytes);
	    
	    System.out.println(randomString);
	    
	    
		}while(!checkValidId(randomString));
		
		return randomString; 
			
	}
	
	private static boolean checkValidId(String id) {
		
	 // controlla che l'id sia univoco
		
		return true;
			
	}
	
	public String getId() {
		return id;
	}
	

}
