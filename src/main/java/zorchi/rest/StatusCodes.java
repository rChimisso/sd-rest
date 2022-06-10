package zorchi.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class StatusCodes {
	
	// Classe che semplifica la risposta(HTTP Status Code) di una richiesta rest, impementando tutte le risposte pi� comuni
	
	// Per sunto sul significato dei codici : https://restfulapi.net/http-status-codes/
	

	
	
	//2xx
	
	
	//200
		public static ResponseEntity<String> FAILED ()
		{
			return new ResponseEntity<String>("Failed", HttpStatus.OK);
			
		}
		
	//200
		public static ResponseEntity<String> OK ()
		{
			return new ResponseEntity<String>("OK", HttpStatus.OK);
					
		}
			
	
	
	//201
	public static ResponseEntity<String> CREATED (String id)
	{
	
		return new ResponseEntity<String>(id, HttpStatus.CREATED);
		
	}
	
	
	
	//3xx
	
	
	//4xx
	
	
	//400 Gestita con eccezione
	public static ResponseEntity<String> BAD_REQUEST ()
	{
		return new ResponseEntity<String>("Incorrectly written request", HttpStatus.BAD_REQUEST);
			
	}
	
	//401
	public static ResponseEntity<String> UNAUTHORIZED ()
	{
		return new ResponseEntity<String>("Invalid user credentials provided", HttpStatus.UNAUTHORIZED);
				
	}
	
	//403 
	public static ResponseEntity<String> FORBIDDEN ()
	{
		return new ResponseEntity<String>("Unauthorized request", HttpStatus.FORBIDDEN);
				
	}
	
	
	//404 Gestita con eccezione
	public static ResponseEntity<String> NOT_FOUND ()
	{
		return new ResponseEntity<String>("Does not exist", HttpStatus.NOT_FOUND);
		
	}
	
	//5xx
	
	
	//502
	public static ResponseEntity<String>  INTERNAL_SERVER_ERROR()
	{
		return new ResponseEntity<String>("An unexpected system error has occurred", HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
	
	//501
	public static ResponseEntity<String> NOT_IMPLEMENTED ()
	{
		return new ResponseEntity<String>("The HTTP method is not supported", HttpStatus.NOT_IMPLEMENTED);
		
	}

}
