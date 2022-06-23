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
import zorchi.entities.Transaction;
import zorchi.entities.Transaction.TransactionData;
import zorchi.entities.Transfer;
import zorchi.entities.Transfer.TransferData;
import zorchi.entities.Transfer.TransferDivertData;
import zorchi.repositories.AccountRepository;
import zorchi.repositories.TransactionRepository;
import zorchi.repositories.TransferRepository;
import zorchi.responses.bodies.AccountHistoryResponseBody;
import zorchi.responses.bodies.GenericResponseBody;
import zorchi.responses.bodies.IndexableResponseBody;
import zorchi.responses.bodies.TransactionResponseBody;
import zorchi.responses.bodies.TransferResponseBody;
import zorchi.responses.headers.CustomHeaders;
import zorchi.utility.Currency;
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
   * @param transferRepository - JPA {@link TransferRepository} iniettata da Spring.
   */
  ApiController(AccountRepository accountRepository, TransactionRepository transactionRepository, TransferRepository transferRepository) {
    this.accountRepository = accountRepository;
    this.transactionRepository = transactionRepository;
    this.transferRepository = transferRepository;
  }

  /**
   * Gestisce le richieste di tipo {@link RequestMethod#GET GET} per il percorso relativo {@code "/active"}.
   * 
   * @return Lista di tutti gli {@link Account Account bancario} validi nel sistema.
   */
  @GetMapping("/active")
  public ResponseEntity<Iterable<Account>> getActive() {
    return new ResponseEntity<>(accountRepository.findAllByDeletedFalse(), HttpStatus.OK);
  }

  /**
   * Gestisce le richieste di tipo {@link RequestMethod#GET GET} per il percorso relativo {@code "/account"}.
   * 
   * @return Lista di tutti gli {@link Account Account bancario} nel sistema.
   */
  @GetMapping("/account")
  public ResponseEntity<Iterable<Account>> getAccount() {
    return new ResponseEntity<>(accountRepository.findAll(), HttpStatus.OK);
  }

  /**
   * Gestisce le richieste di tipo {@link RequestMethod#POST POST} per il percorso relativo {@code "/account"}.
   * <p>
   * Crea un nuovo {@link Account Account bancario} in base ai dati passati.
   * 
   * @param accountData - dati nel corpo della richiesta del nuovo {@link Account Account bancario} da creare.
   * @return L'ID del nuovo {@link Account Account bancario} creato.
   */
  @PostMapping("/account")
  public ResponseEntity<IndexableResponseBody> postAccount(@Valid @RequestBody AccountData accountData) {
    Account account = new Account(accountData, ShortUUID.randomShortUUID(accountRepository::existsById));
    if (account.isValid()) {
      accountRepository.save(account);
      return new ResponseEntity<>(new IndexableResponseBody(account.getUUID(), "Account creato con successo."), HttpStatus.CREATED);
    }
    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
  }

  /**
   * Gestisce le richieste di tipo {@link RequestMethod#DELETE DELETE} per il percorso relativo {@code "/account"}.
   * <p>
   * Se esiste, elimina l'{@link Account Account bancario} con l'ID specificato.
   * 
   * @param id - Parametro della richiesta con valore l'ID dell'{@link Account Account bancario} da eliminare.
   * @return esito dell'operazione.
   */
  @DeleteMapping("/account")
  public ResponseEntity<String> deleteAccount(@Valid @RequestParam String id) {
    if (ShortUUID.isValidShortUUID(id)) {
      Account account = findAccount(id);
      if (account.isValid()) {
        account.delete();
        accountRepository.save(account);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  /**
   * Gestisce le richieste di tipo {@link RequestMethod#GET GET} per il percorso relativo {@code "/account"}.
   * 
   * @param id - variabile di percorso: ID dell'{@link Account Account bancario} di cui recuperare le informazioni.
   * @return {@link AccountHistoryResponseBody}.
   */
  @GetMapping("/account/{id}")
  public ResponseEntity<AccountHistoryResponseBody> getAccountId(@Valid @PathVariable String id) {
	  if (ShortUUID.isValidShortUUID(id)) {
		  Account account = findAccount(id);
      if (account.isValid()) {
        return new ResponseEntity<>(
          new AccountHistoryResponseBody(account, accountRepository.findAllMovementsForAccount(account.getUUID())),
          CustomHeaders.getXSistemaBancarioHeader(account.getName(), account.getSurname()),
          HttpStatus.OK
        );
	    }
	    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  /**
   * Gestisce le richieste di tipo {@link RequestMethod#POST POST} per il percorso relativo {@code "/account"} con variabile di percorso {@code "/{id}"}.
   * <p>
   * Crea una nuova transazione coi dati specificati e aggiorna il saldo dell'{@link Account Account bancario} coinvolto.
   * 
   * @param id - variabile di percorso: ID dell'{@link Account Account bancario} di cui recuperare le informazioni.
   * @param transactionData - Dati nel corpo della richiesta della {@link Transaction}.
   * @return {@link TransactionResponseBody}.
   */
  @PostMapping("/account/{id}")
  public ResponseEntity<TransactionResponseBody> postAccountId(@PathVariable String id, @Valid @RequestBody TransactionData transactionData) {
    if (ShortUUID.isValidShortUUID(id)) {
      Account account = findAccount(id);
      if (account.isValid()) {
        double newBalance = Currency.sum(account.getBalance(), transactionData.getAmount());
        if (newBalance >= 0) {
          account.setBalance(newBalance);
          Transaction transaction = new Transaction(transactionData, account, StandardUUID.randomUUID(transactionRepository::existsById));
          accountRepository.save(account);
          transactionRepository.save(transaction);
          return new ResponseEntity<>(new TransactionResponseBody(newBalance, transaction.getUUID(), account.getUUID()), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(new TransactionResponseBody(-1, StandardUUID.INVALID_UUID, StandardUUID.INVALID_UUID), HttpStatus.BAD_REQUEST);
      }
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  /**
   * Gestisce le richieste di tipo {@link RequestMethod#PUT PUT} per il percorso relativo {@code "/account"} con variabile di percorso {@code "/{id}"}.
   * 
   * @param id - variabile di percorso: ID dell'{@link Account Account bancario} di cui recuperare le informazioni.
   * @return esito dell'operazione.
   */
  @PutMapping("/account/{id}")
  public ResponseEntity<String> putAccountId(@PathVariable String id, @Valid @RequestBody AccountData accountData) {
    if (ShortUUID.isValidShortUUID(id)) {
      Account account = findAccount(id);		
      if (account.isValid()) {
        account.setName(accountData.getName());
        account.setSurname(accountData.getSurname());
        accountRepository.save(account);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }
  
  /**
   * Gestisce le richieste di tipo {@link RequestMethod#PATCH HEAD} per il percorso relativo {@code "/account"} con variabile di percorso {@code "/{id}"}.
   * 
   * @param id - variabile di percorso: ID dell'{@link Account Account bancario} di cui recuperare le informazioni.
   * @return esito dell'operazione.
   */
  @PatchMapping("/account/{id}")
  public ResponseEntity<String> patchAccountId(@PathVariable String id, @RequestBody AccountData accountData) {
    String name = accountData.getName(), surname = accountData.getSurname();
    if (ShortUUID.isValidShortUUID(id) && (name != null ^ surname != null)) {
      Account account = findAccount(id);
      if (account.isValid()) {
        if (name != null) {
          account.setName(name);
        } else {
          account.setSurname(surname);
        }
        accountRepository.save(account);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }
  
  /**
   * Gestisce le richieste di tipo {@link RequestMethod#HEAD HEAD} per il percorso relativo {@code "/account"} con variabile di percorso {@code "/{id}"}.
   * 
   * @param id - variabile di percorso: ID dell'{@link Account Account bancario} di cui recuperare le informazioni.
   * @return L'header {@link CustomHeaders#getXSistemaBancarioHeader XSistemaBancario} con {@link Account#name nome} e {@link Account#surname cognome} dell'{@link Account Account bancario}. 
   */
  @RequestMapping(value = "/account/{id}", method = RequestMethod.HEAD)
  public ResponseEntity<String> headAccountId(@PathVariable String id) {
    if (ShortUUID.isValidShortUUID(id)) {	
      Account account = findAccount(id);
      if (account.isValid()) {
        return new ResponseEntity<>(CustomHeaders.getXSistemaBancarioHeader(account.getName(), account.getSurname()), HttpStatus.OK);
      }
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

  /**
   * Gestisce le richieste di tipo {@link RequestMethod#POST POST} per il percorso relativo {@code "/transfer"}.
   * 
   * @param transferData - dati nel corpo della richiesta del {@link Transfer Trasferimento} da eseguire.
   * @return {@link TransferResponseBody}.
   */
  @PostMapping("/transfer")
  public ResponseEntity<TransferResponseBody> postTransfer(@Valid @RequestBody TransferData transferData) {
    String senderId = transferData.getFrom(), recipientId = transferData.getTo();
    if (ShortUUID.isValidShortUUID(senderId) && ShortUUID.isValidShortUUID(recipientId)) {
      Account sender = findAccount(senderId), recipient = findAccount(recipientId);
      if (sender.isValid() && recipient.isValid()) {
        Transfer transfer = new Transfer(sender, recipient, Math.abs(transferData.getAmount()), transactionRepository::existsById, StandardUUID.randomUUID(transferRepository::existsById));
        if (transfer.isValid()) {
          double newSenderBalance = Currency.sub(sender.getBalance(), transfer.getAmount()), newRecipientBalance = Currency.sum(recipient.getBalance(), transfer.getAmount());
          sender.setBalance(newSenderBalance);
          recipient.setBalance(newRecipientBalance);
          accountRepository.save(sender);
          accountRepository.save(recipient);
          transactionRepository.save(transfer.getSenderTransaction());
          transactionRepository.save(transfer.getRecipientTransaction());
          transferRepository.save(transfer);
          return new ResponseEntity<>(new TransferResponseBody(newSenderBalance, newRecipientBalance, sender.getUUID(), recipient.getUUID(), transfer.getUUID()), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(new TransferResponseBody(-1, -1, StandardUUID.INVALID_UUID, StandardUUID.INVALID_UUID, StandardUUID.INVALID_UUID), HttpStatus.BAD_REQUEST);
      }
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  /**
   * Gestisce le richieste di tipo {@link RequestMethod#POST POST} per il percorso relativo {@code "/divert"}.
   * 
   * @param transferDivertData - dati nel corpo della richiesta del {@link Transfer Trasferimento} di cui fare il divert.
   * @return esito dell'operazione.
   */
  @PostMapping("/divert")
  public ResponseEntity<GenericResponseBody> postDivert(@Valid @RequestBody TransferDivertData transferDivertData) {
    String transferId = transferDivertData.getId();
    if (StandardUUID.isValidStandardUUID(transferId)) {
      Transfer transfer = findTransfer(transferId);
      if (transfer.isValid()) {
        Account sender = transfer.getSenderTransaction().getAccount(), recipient = transfer.getRecipientTransaction().getAccount();
        if (recipient.canTransfer(transfer.getAmount())) {
          Transfer divertedTransfer = new Transfer(recipient, sender, transfer.getAmount(), transactionRepository::existsById, StandardUUID.randomUUID(transferRepository::existsById));
          transactionRepository.save(divertedTransfer.getSenderTransaction());
          transactionRepository.save(divertedTransfer.getRecipientTransaction());
          transferRepository.save(divertedTransfer);
          return new ResponseEntity<>(new GenericResponseBody(TransferResponseBody.Messages.SUCCESS.get()), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(new GenericResponseBody(TransferResponseBody.Messages.FAILURE.get()), HttpStatus.BAD_REQUEST);
      }
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  /**
   * Restituisce l'{@link Account Account bancario} con l'id specificato o un Account non valido se non esiste Account con tale id.
   * 
   * @param id - UUID dell'{@link Account Account bancario} da recuperare.
   * @return {@link Account Account bancario}.
   */
  private Account findAccount(String id) {
    return accountRepository.findById(id.toUpperCase()).orElse(Account.INVALID_ACCOUNT);
  }

  /**
   * Restituisce il {@link Transfer Trasferimento} con l'id specificato o un Trasferimento non valido se non esiste Trasferimento con tale id.
   * 
   * @param id - UUID dell {@link Transfer Trasferimento} da recuperare.
   * @return {@link Transfer Trasferimento}.
   */
  private Transfer findTransfer(String id) {
    return transferRepository.findById(id.toUpperCase()).orElse(Transfer.INVALID_TRANSFER);
  }
}
