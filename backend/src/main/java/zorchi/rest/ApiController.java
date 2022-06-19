package zorchi.rest;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import zorchi.entities.Account.AccountFullData;
import zorchi.entities.Transaction;
import zorchi.entities.Transaction.TransactionData;
import zorchi.entities.Transfer;
import zorchi.entities.Transfer.TransferData;
import zorchi.entities.Transfer.TransferId;
import zorchi.repositories.AccountRepository;
import zorchi.repositories.TransactionRepository;
import zorchi.repositories.TransferRepository;
import zorchi.responses.bodies.TransactionResponseBody;
import zorchi.responses.bodies.TransferResponseBody;
import zorchi.responses.headers.CustomHeaders;
import zorchi.utility.StandardUUID;
import zorchi.utility.StandardUUID.ShortUUID;

/**
 * Controller per la gestione delle richieste con radice {@code "/api"}.
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ApiController {
  /**
   * JPA {@link AccountRepository}.
   */
  private final AccountRepository accountRepository;

  /**
   * JPA {@link TransactionRepository}.
   */
  private final TransactionRepository transactionRepository;
  
  /**
   * JPA {@link TransferRepository}.
   */
  private final TransferRepository transferRepository;

  /**
   * @param accountRepository - JPA {@link AccountRepository} iniettata da Spring.
   * @param transactionRepository - JPA {@link TransactionRepository} iniettata da Spring.
   */
  ApiController(AccountRepository accountRepository, TransactionRepository transactionRepository, TransferRepository transferRepository) {
    this.accountRepository = accountRepository;
    this.transactionRepository = transactionRepository;
    this.transferRepository = transferRepository;
  }

  /**
   * Gestisce le richieste di tipo {@link RequestMethod#GET GET} per il percorso relativo {@code "/account"}.
   * 
   * @return Lista di tutti gli {@link Account} nel sistema.
   */
  @GetMapping("/account")
  public ResponseEntity<Iterable<Account>> getAccount() {
    return new ResponseEntity<>(accountRepository.findAll(), HttpStatus.OK);
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
      return new ResponseEntity<>(account.getID(), HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
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
      return new ResponseEntity<>(HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  /**
   * TODO
   *  // Ricordarsi di scrivere sulla documentazione che cambiamo la risposta aggiungendo data amount e destinatario
   * @param id - variabile di percorso: {@link Account#ID ID} dell'{@link Account} di cui recuperare le informazioni.
   * @return
   */
  @GetMapping("/account/{id}")
	public ResponseEntity<AccountFullData> getAccountId(@PathVariable String id) {
	  Account account = accountRepository.findById(id).orElseGet(Account::new);
    if (account.isValid()) {
      return new ResponseEntity<>(
        new AccountFullData(account, transactionRepository.findTransactionFormAccountId(account.getID())),
        CustomHeaders.getXSistemaBancarioHeader(account.getName(), account.getSurname()),
        HttpStatus.OK
      );
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

  /**
   * Gestisce le richieste di tipo {@link RequestMethod#POST POST} per il percorso relativo {@code "/account"} con variabile di percorso {@code "/{id}"}.
   * 
   * @param id - variabile di percorso: {@link Account#ID ID} dell'{@link Account} di cui recuperare le informazioni.
   * @param transactionData - Dati nel corpo della richiesta della {@link Transaction}.
   * @return {@link TransactionResponseBody}.
   */
  @PostMapping("/account/{id}")
	public ResponseEntity<TransactionResponseBody> postAccountId(@PathVariable String id, @Valid @RequestBody TransactionData transactionData) {
    Account account = accountRepository.findById(id).orElseGet(Account::new);
    if (account.isValid()) {
      long newBalance = account.getBalance() + transactionData.getAmount();
      if (newBalance >= 0) {
        account.setBalance(newBalance);
        Transaction transaction = new Transaction(transactionData, account, StandardUUID.randomUUID(transactionRepository::existsById));
        accountRepository.save(account);
        transactionRepository.save(transaction);
        return new ResponseEntity<>(new TransactionResponseBody(newBalance, transaction.getUUID()), HttpStatus.OK);
      }
      return new ResponseEntity<>(new TransactionResponseBody(-1, StandardUUID.INVALID_UUID), HttpStatus.OK);
    }
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
  /**
   * Gestisce le richieste di tipo {@link RequestMethod#PUT PUT} per il percorso relativo {@code "/account"} con variabile di percorso {@code "/{id}"}.
   * 
   * @param id - variabile di percorso: {@link Account#ID ID} dell'{@link Account} di cui recuperare le informazioni.
   * @return {@link HttpStatus}.
   */
	@PutMapping("/account/{id}")
	public ResponseEntity<String> putAccountId(@PathVariable String id, @Valid @RequestBody AccountData accountData) {
    Account account = accountRepository.findById(id).orElseGet(Account::new);
    if (account.isValid()) {
      account.setName(accountData.getName());
      account.setSurname(accountData.getSurname());
      accountRepository.save(account);
      return new ResponseEntity<>(HttpStatus.OK);
    }
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
  /**
   * Gestisce le richieste di tipo {@link RequestMethod#PATCH HEAD} per il percorso relativo {@code "/account"} con variabile di percorso {@code "/{id}"}.
   * 
   * @param id - variabile di percorso: {@link Account#ID ID} dell'{@link Account} di cui recuperare le informazioni.
   * @return {@link HttpStatus}.
   */
	@PatchMapping("/account/{id}")
	public ResponseEntity<String> patchAccountId(@PathVariable String id, @RequestBody AccountData accountData) {
    Account account = accountRepository.findById(id).orElseGet(Account::new);
    if (account.isValid()) {
      String name = accountData.getName(), surname = accountData.getSurname();
      if (name != null || surname != null) {
        if (name != null) {
          account.setName(name);
        }
        if (surname != null) {
          account.setSurname(surname);
        }
        accountRepository.save(account);
        return new ResponseEntity<>(HttpStatus.OK);
      }
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
  /**
   * Gestisce le richieste di tipo {@link RequestMethod#HEAD HEAD} per il percorso relativo {@code "/account"} con variabile di percorso {@code "/{id}"}.
   * 
   * @param id - variabile di percorso: {@link Account#ID ID} dell'{@link Account} di cui recuperare le informazioni.
   * @return L'header {@link CustomHeaders#getXSistemaBancarioHeader XSistemaBancario} con {@link Account#name nome} e {@link Account#surname cognome} dell'{@link Account}. 
   */
	@RequestMapping(value = "/account/{id}", method = RequestMethod.HEAD)
	public ResponseEntity<String> headAccountId(@PathVariable String id) {
    Account account = accountRepository.findById(id).orElseGet(Account::new);
    if (account.isValid()) {
      return new ResponseEntity<String>(CustomHeaders.getXSistemaBancarioHeader(account.getName(), account.getSurname()), HttpStatus.OK);
    }
    return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
	}

  /**
   * TODO
   *  Da sistemare ,� quella da modificare inserendo i controlli nel costruttore
   * @param transferData
   * @return
   */
  @PostMapping("/transfer")
	public ResponseEntity<TransferResponseBody> postTransfer(@RequestBody TransferData transferData) {

	  // Verificare che amount si un intero
	  if(Account.goodRequest(transferData.getTo()) && Account.goodRequest(transferData.getFrom()))
	  {
		  
			  Account accountTo = accountRepository.findById(transferData.getTo()).orElseGet(Account::new);
			  Account accountFrom = accountRepository.findById(transferData.getFrom()).orElseGet(Account::new);
		    if (accountTo.isValid() && accountFrom.isValid()) 
		    {
		    	long newFromBalance = accountFrom.getBalance() - Math.abs(transferData.getAmount());
		    	long newToBalance = accountFrom.getBalance() + Math.abs(transferData.getAmount());
		    	if (newFromBalance >= 0) 
		    	{
		    		accountFrom.setBalance(newFromBalance);
		        	accountTo.setBalance(newToBalance);
		        	Transfer transfer = new Transfer(accountTo, accountFrom, Math.abs(transferData.getAmount()), transactionRepository::existsById, StandardUUID.randomUUID(transferRepository::existsById));
		        
		        	accountRepository.save(accountFrom);
		        	accountRepository.save(accountTo);
		        	transactionRepository.save(transfer.getFrom());
		        	transactionRepository.save(transfer.getTo());
		        	transferRepository.save(transfer);
		        	return new ResponseEntity<>(new TransferResponseBody(newFromBalance, newToBalance, accountFrom.getID(), accountTo.getID(), transfer.getUUID()), HttpStatus.OK);
		    	}
		    	else
		    	{
		    		return new ResponseEntity<>(new TransferResponseBody("Trasferimento fallisto: il bilancio e' inferiore a quanto richiesto."), HttpStatus.OK);
		    	}
	    
		    }
		    else
		    {
		    	//Ci vorrebbe un 404 HttpStatus.NOT_FOUND
		    	return new ResponseEntity<>(new TransferResponseBody("Trasferimento fallisto: Account non trovato"), HttpStatus.OK);
	    	
		    }
		}
		
	  return new ResponseEntity<>(new TransferResponseBody("Trasferimento fallisto: Campi compilati erroneamente"), HttpStatus.BAD_REQUEST);
		
	 
		  
	  }
      
  

  /**
   * TODO
   * Da sistemare
   * @param transferId
   * @return
   */
	@PostMapping("/divert")
	public ResponseEntity<String> postDivert(@RequestBody TransferId transferId) {
		//RICORDARSI DI INSERIRE CONTROLLO SU ID PER LANCIARE BAD REQUEST
		
		
		Transfer transfer = transferRepository.findById(transferId.getId()).orElseGet(Transfer::new);
		if (transfer.isValid()) {
		   
				Account to = transfer.getTo().getACCOUNT();
				Account from = transfer.getFrom().getACCOUNT();
				
				if(from.canTransfer(transfer.getAmount()))
					{
				
						Transfer newTransfer = new Transfer(from, to, Math.abs(transfer.getAmount()), transactionRepository::existsById,StandardUUID.randomUUID(transferRepository::existsById));
						transactionRepository.save(newTransfer.getFrom());
						transactionRepository.save(newTransfer.getTo());
						transferRepository.save(newTransfer);
						return new ResponseEntity<>(HttpStatus.OK);
					}
				else
					{
					return new ResponseEntity<>("Saldo del destinatari non sufficente, operazione annulata ",HttpStatus.OK);
					}
		        
		      }
		
		
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		
	}		 

