package zorchi.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Spring RESTful application Entry Point.
 */
@SpringBootApplication
@EntityScan("zorchi.entities")
@EnableJpaRepositories("zorchi.repositories")
public class RestApplication {
  /**
   * Esegue il bootstrap dell'applicazione Spring.
   * 
   * @param args - Eventuali argomenti per l'applicazione.
   */
	public static void main(String... args) {
		SpringApplication.run(RestApplication.class, args);
	}
}
