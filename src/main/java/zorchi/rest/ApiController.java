package zorchi.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import zorchi.entities.Account;
import zorchi.repositories.AccountRepository;

/**
 * 
 */
@RestController
@RequestMapping("/api")
public class ApiController {
  /**
   * 
   */
  private final AccountRepository accountRepository;

  /**
   * @param accountRepository
   */
  ApiController(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  /**
   * 
   * 
   * @return
   */
  @GetMapping("/account")
  public ResponseEntity<Iterable<Account>> getAccount() {
    return new ResponseEntity<Iterable<Account>>(accountRepository.findAll(), HttpStatus.OK);
  }
}
