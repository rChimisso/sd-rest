package ZorChi.REST;




import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class Controller  {
	
	
	
	//-----------HTML------------//
	
	@RequestMapping("/")
	public String homeHTML() {
		
		return "homePage";
		
	}
	
	@RequestMapping("/transfer")
	public String trensferHTML() {
		
		return "transferPage";
		
	}
	
	
	//------------API------------//
	
	@GetMapping("/api/account")
	public ResponseEntity<String> getAccount() {
		
		return StatusCodes.OK();
	}
	
	//Sto lavorando a questo
	@PostMapping( value = "/api/account" , consumes = "application/json", produces = "application/json")
	public ResponseEntity<Object> postAccount(@RequestBody Account account) {
		
		//System.out.println(account.getName() + " " + account.getSurname());
		
		//System.out.println("Account generato con id: "+ account.getId() );   
		
		return new ResponseEntity<Object>(account.getId(), HttpStatus.CREATED);
		    
		}
	
	@DeleteMapping("/api/account")
	public ResponseEntity<String> deleteAccount() {
		
		return StatusCodes.OK();
	}
	
	//---------------------------//
	
	@GetMapping("/api/account/{accountId}")
	public ResponseEntity<String> getAccountId(@PathVariable String accountId) {
		
		return StatusCodes.OK();
		
	}
	
	@PostMapping("/api/account/{accountId}")
	public ResponseEntity<String> postAccountId(@PathVariable String accountId, @RequestBody String body) {
		
		return StatusCodes.OK();
		
	}
	
	@PutMapping("/api/account/{accountId}")
	public ResponseEntity<String> putAccountId(@PathVariable String accountId) {
		
		return StatusCodes.OK();
		
	}
	
	@PatchMapping("/api/account/{accountId}")
	public ResponseEntity<String> patchAccountId(@PathVariable String accountId) {
		
		return StatusCodes.OK();
		
	}
	
	
	@RequestMapping(value =  "/api/account/{accountId}", method = RequestMethod.HEAD)
	public ResponseEntity<String> headAccountId(@PathVariable String accountId) {
		
		return StatusCodes.OK();
		
	}
	
	//---------------------------//
	
	
	@PostMapping("/api/transfer")
	public ResponseEntity<String> postTransfer(@RequestBody String body) {
		
		return StatusCodes.OK();
		
	}
	
	//---------------------------//
	
	
	@PostMapping("/api/divert")
	public ResponseEntity<String> postDivert(@RequestBody String body) {
		
		return StatusCodes.OK();
		
	}			
	
	//---------------------------//

	

	
	


}
