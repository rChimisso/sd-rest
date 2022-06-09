package ZorChi.REST;


import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
	
	
	//---------------------------//
	
	@GetMapping("/api/account")
	public String getAccount() {
		
		return "getAccount called";
	}
	
	@PostMapping("/api/account")
	public String postAccount() {
		
		return "postAccount called";
	}
	
	@DeleteMapping("/api/account")
	public String deleteAccount() {
		
		return "deleteAccount called";
	}
	
	//---------------------------//
	
	@GetMapping("/api/account/{accountId}")
	public String getAccountId(@PathVariable String accountId) {
		
		return "getAccountId called with parameter " + accountId;
		
	}
	
	@PostMapping("/api/account/{accountId}")
	public String postAccountId(@PathVariable String accountId) {
		
		return "postAccountId called with parameter " + accountId;
		
	}
	
	@PutMapping("/api/account/{accountId}")
	public String putAccountId(@PathVariable String accountId) {
		
		return "putAccountId called with parameter " + accountId;
		
	}
	
	@PatchMapping("/api/account/{accountId}")
	public String patchAccountId(@PathVariable String accountId) {
		
		return "patchAccountId called with parameter " + accountId;
		
	}
	
	
	@RequestMapping(value =  "/api/account/{accountId}", method = RequestMethod.HEAD)
	public String headAccountId(@PathVariable String accountId) {
		
		return "headAccountId called with parameter " + accountId;
		
	}
	
	//---------------------------//
	
	
	@PostMapping("/api/transfer")
	public String postTransfer() {
		
		return "postTransfer called" ;
		
	}
	
	//---------------------------//
	
	
	@PostMapping("/api/divert")
	public String postDiver() {
		
		return "postDivert called" ;
		
	}			
	
	//---------------------------//

	

	
	


}
