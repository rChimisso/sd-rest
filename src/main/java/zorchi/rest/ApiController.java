package zorchi.rest;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import zorchi.entities.Account;
import zorchi.entities.Account.AccountData;
import zorchi.repositories.AccountRepository;
import zorchi.utility.StandardUUID.ShortUUID;

/**
 * Controller per la gestione delle richieste con radice {@code "/api"}.
 */
@RestController
@RequestMapping("/api")
public class ApiController {
  /**
   * JPA {@link AccountRepository}.
   */
  public final AccountRepository accountRepository;

  /**
   * @param accountRepository - JPA {@link AccountRepository} iniettata da Spring.
   */
  ApiController(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  /**
   * Gestisce le richieste di tipo {@link RequestMethod#GET GET} per il percorso relativo {@code "/account"}.
   * 
   * @return Lista di tutti gli {@link Account} nel sistema.
   */
  @GetMapping("/account")
  public ResponseEntity<Iterable<Account>> getAccount() {
    return new ResponseEntity<Iterable<Account>>(accountRepository.findAll(), HttpStatus.OK);
  }

  /**
   * Gestisce le richieste di tipo {@link RequestMethod#POST POST} per il percorso relativo {@code "/account"}.
   * <p>
   * Crea un nuovo {@link Account} in base ai dati passati.
   * 
   * @param accountData - Dati nel corpo della richiesta del nuovo {@link Account} da creare.
   * @return L'{@link Account#ID ID} del nuovo {@link Account} creato.
   */
  @PostMapping("/account")
  public ResponseEntity<String> postAccount(@Valid @RequestBody AccountData accountData) {
    Account account = new Account(accountData, ShortUUID.randomShortUUID(accountRepository::existsById));
    if (account.isValid()) {
      accountRepository.save(account);
      return new ResponseEntity<String>(account.getID(), HttpStatus.OK);
    }
    return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
  }

  /**
   * Gestisce le richieste di tipo {@link RequestMethod#DELETE DELETE} per il percorso relativo {@code "/account"}.
   * <p>
   * Se esiste, elimina l'{@link Account} con l'{@link Account#ID ID} specificato.
   * 
   * @param id - Parametro della richiesta con valore l'{@link Account#ID ID} dell'{@link Account} da eliminare.
   * @return risultato dell'operazione.
   */
  @DeleteMapping("/account")
  public ResponseEntity<String> deleteAccount(@Valid @RequestParam String id) {
    if (accountRepository.existsById(id)) {
      accountRepository.deleteById(id);
      return new ResponseEntity<String>(HttpStatus.OK);
    }
    return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
  }

  @GetMapping("/account/{id}")
	public ResponseEntity<String> getAccountId(@PathVariable String id) {
    return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
	}

  @PostMapping("/account/{id}")
	public ResponseEntity<String> postAccountId(@PathVariable String id, @RequestBody String body) {
		return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);		
	}
	
	@PutMapping("/account/{id}")
	public ResponseEntity<String> putAccountId(@PathVariable String id) {
		return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);		
	}
	
	@PatchMapping("/account/{id}")
	public ResponseEntity<String> patchAccountId(@PathVariable String id) {
		return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);		
	}
	
  /**
   * Gestisce le richieste di tipo {@link RequestMethod#HEAD HEAD} per il percorso relativo {@code "/account"} con variabile di percorso {@code "/{id}"}.
   * 
   * @param id - variabile di percorso: {@link Account#ID ID} dell'{@link Account} di cui recuperare le informazioni.
   * @return {@link Account#name nome} e {@link Account#surname cognome} dell'{@link Account} in un header di chiave {@code "X-Sistema-Bancario"} e valore nel formato {@code "nome;cognome"}. 
   */
	@RequestMapping(value = "/account/{id}", method = RequestMethod.HEAD)
	public ResponseEntity<String> headAccountId(@PathVariable String id) {
    Account account = accountRepository.findById(id).orElseGet(Account::new);
    if (account.isValid()) {
      return new ResponseEntity<String>(new LinkedMultiValueMap<String, String>(Map.of("X-Sistema-Bancario", List.of(account.getName() + ";" + account.getSurname()))), HttpStatus.OK);
    }
    return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
	}

  @PostMapping("/transfer")
	public ResponseEntity<String> postTransfer(@RequestBody String body) {
		return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
	}

	@PostMapping("/divert")
	public ResponseEntity<String> postDivert(@RequestBody String body) {
		return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
	}		
}
