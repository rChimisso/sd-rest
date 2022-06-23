# ***Progetto REST per Sistemi Distribuiti***

## **Membri gruppo**
Riccardo Chimisso - 866009  
Mauro Zorzin - 866001

---

## **Descrizione**
Progetto Endpoint REST di Sistemi Distribuiti.

Ipotetico applicativo Fullstack per un sistema bancario, suddiviso in [Backend] e [Frontend].  
La parte di [Backend] si basa su Java e il framework Spring, mentre la parte di [Frontend] si basa su [TypeScript] e il framework [Angular 14].

Il progetto è diviso in 2 sezioni: [`frontend`](./frontend/) e [`backend`](./backend/), strutturate singolarmente e trattabili come 2 progetti separati ma integrati fra loro.  
In entrambe le sezioni il codice è estensivamente documentato tramite Javadoc ([Backend]) e JSDoc ([Frontend]).

---

## **Frontend**
### **Tecnologie**
*Tutte le tecnologie utilizzate e le loro versioni sono presenti in dettaglio all'interno del [package.json](./frontend/package.json)*
- [NodeJs](https://nodejs.org/it/) 16.15.1 - gestione del progetto [Frontend].
- [TypeScript] 4.7.2 - linguaggio principale utilizzato.
- [Angular 14] - framework principale per la realizzazione della logica frontend.
- [NgRx 14](https://ngrx.io/docs) - framework secondario per la gestione dei dati runtime (state) dell'applicazione.
- [SCSS](https://sass-lang.com/) - estensione di CSS.
### **Struttura**
Il lato [Frontend] del progetto segue la struttura di un progetto TypeScript con Angular.  
In particolare sotto [`src/app/`](./frontend/src/app/) sono presenti i vari componenti Angular e gestione dello stato di NgRx, divisi per scopo:
- [`abstract/`](./frontend/src/app/abstract/):  
  Contiene le definizioni astratte e generali di componenti comuni ai vari moduli.
- [`core/`](./frontend/src/app/core/):  
  Contiene tutti i fondamentali per il funzionamento del progetto, dalle definizioni di nuovi tipi e interfacce alla gestione dello state core dell'applicazione.  
  Contiene inoltre il servizio per la gestione delle chiamate HTTP ai vari endpoint del [Backend].
- [`shared/`](./frontend/src/app/shared/):  
  Contiene varie definizioni comuni a 2 o più moduli dell'applicazione.
- [`features/`](./frontend/src/app/features/):  
  Contiene i moduli principali dell'applicazione che gestiscono le interazioni con l'utente.
  - [`accounts-list/`](./frontend/src/app/features/accounts-list/):  
    Contiene le definizioni per la gestione della pagina adibita alla visualizzazione dell'elenco degli account bancari presenti nel sistema.
  - [`app-overlay/`](./frontend/src/app/features/app-overlay/):  
    Contiene le definizioni per la gestione degli overlay comuni a tutte le pagine, quali il banner, il loader visibile durante l'attesa di chiamate HTTP e il dialog che avverte l'utente degli eventuali errori nelle chiamate HTTP.
  - [`home/`](./frontend/src/app/features/home/):  
    Contiene le definizioni per la gestione della pagina home che permette una navigazione agevole tra le varie pagine dell'applicazione.
  - [`root/`](./frontend/src/app/features/root/):  
    Contiene le definizioni per la gestione della pagina adibita alla visualizzazione dello storico di un qualsiasi account bancario valido del sistema.
  - [`transfer/`](./frontend/src/app/features/transfer/):  
    Contiene le definizioni per la gestione della pagina adibita alla creazione di trasferimenti tra due account bancari validi del sistema.
  - [`transaction/`](./frontend/src/app/features/transaction/):  
    Contiene le definizioni per la gestione della pagina adibita alla creazione di transazioni per un account bancario valido del sistema.
### **Endpoint**
*Ogni path non esplicitamente mappato reindirizza alla pagina home*
- [`/`](http://localhost:4200/):  
  Enpoint root, fornisce la pagina root per lo storico di un account.
- [`/home`](http://localhost:4200/home):  
  Endpoint home, fornisce la pagina per la navigazione nell'applicazione.
- [`/accounts-list`](http://localhost:4200/accounts-list):  
  Endpoint accounts-list, fornisce la pagina per l'elenco degli account.
- [`/transfer`](http://localhost:4200/transfer):  
  Endpoint transfer, fornisce la pagina per le richieste di trasferimenti.
- [`/transaction`](http://localhost:4200/transaction):  
  Endpoint transaction, fornisce la pagina per le richieste di transazioni.

Gli endpoint `home`, `accounts-list` e `transaction` sono stati aggiunti oltre alle specifiche di base richieste per il [Frontend].

---

## **Backend**
### **Tecnologie**
- [Gradle](https://gradle.org/) - gestione del progetto [Backend].
- Java 17 - linguaggio utilizzato.
- [Spring](https://spring.io/) - framework per la creazione di un applicativo REST.
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa) - framework per la gestione della persistenza.
- [H2](https://www.h2database.com/html/main.html) - DBMS.
- [FasterXML/jackson-core](https://github.com/FasterXML/jackson-core) - API per la gestione dei JSON.
### **Struttura**
Il lato [Backend] del progetto segue la struttura di un progetto Spring gestito da Gradle.  
In particolare sotto [`src/main/java/zorchi/`](./backend/src/main/java/zorchi/) sono presenti le varie classi Java annotate per funzionare con Spring e JPA, divise per scopo:
- [`entities/`](./backend/src/main/java/zorchi/entities/):  
  Contiene tutte le entità del sistema, quali [`Account`](./backend/src/main/java/zorchi/entities/Account.java), [`Transaction`](./backend/src/main/java/zorchi/entities/Transaction.java) e [`Transfer`](./backend/src/main/java/zorchi/entities/Transfer.java).  
  Contiene inoltre delle utili astrazioni delle varie entità e sottoclassi per la gestione delle richieste HTTP per la creazione o modifica delle entità.  
  Ciascuna classe è annotata con delle specifiche annotazioni per determinare come tali entità debbano essere gestite a livello di persistenza. 
- [`repositories/`](./backend/src/main/java/zorchi/repositories/):  
  Contiene tutte le [`CrudRepository`](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/CrudRepository.html) (Create Read Update Delete) che gestiscono le interazioni tra il codice Java e i dati persistiti.
- [`responses/`](./backend/src/main/java/zorchi/responses/):  
  Contiene le classi necessarie per la tipizzazione e la corretta strutturazione di alcune risposte HTTP, sia per l'eventuale body che per gli eventuali header aggiuntivi.
- [`rest/`](./backend/src/main/java/zorchi/rest/):  
  Contiene le classi principali dell'applicativo REST, ovvero la classe di bootstrap di Spring [`RestApplication`](./backend/src/main/java/zorchi/rest/RestApplication.java) e il controller [`ApiController`](./backend/src/main/java/zorchi/rest/ApiController.java) per la gestione degli endpoint.
- [`utility/`](./backend/src/main/java/zorchi/utility/):  
  Contiene alcune classi di utilità per semplificare la scrittura del codice e lo sviluppo.

Sotto [`src/main/resources/`](./backend/src/main/resources/) sono invece presenti le configurazioni per il database ([`application.properties`](backend\src\main\resources\application.properties)) e il database stesso ([`h2_persistence.mv.db`]).
### **Database**
Il file del database, [`h2_persistence.mv.db`], non è presente inizialmente nel progetto e verrà generato dopo il primo avvio del [Backend].  
Lo schema del database è il seguente:
- **ACCOUNT**
  - *`UUID`*: Identificativo a 10 byte (20 caratteri esadecimali) dell'account come da specifiche.
  - *`BALANCE`*: Double che rappresenza il saldo dell'account. Può andare in negativo (in rosso) solo tramite prelievi e in quello stato l'account potrà eseguire unicamente depositi, ovvero transazione con ammontare positivo.
  - *`DELETED`*: Booleano che indica se l'account è stato eliminato.
  - *`NAME`*: Nome del propietario dell'account.
  - *`SURNAME`*: Cognome del propietario dell'account.
- **TRANSACTION**
  - *`UUID`*: Identificativo a 16 byte (32 caratteri esadecimali) della transazione come da specifiche.
  - *`AMOUNT`*: Double che rappresenza la quantità di denaro da prelevare, se negativa, o depositare, se positiva.
  - *`DATE`*: Data dell'operazione.
  - *`ACCOUNT_UUID`*: Identificativo dell'account che sta effettuando la transazione.
- **TRANSFER**
  - *`UUID`*: Identificativo a 16 byte (32 caratteri esadecimali) del trasferimento come da specifiche.
  - *Amount*: Double che rappresenza lo quantità di denaro da trasferire, sempre positivo.
  - *`DATE`*: Data dell'operazione.
  - *`SENDER_TRANSACTION`*: Identificativo della transazione che viene generata per prelevare il denaro dall'account mittente.
  - *`RECIPIENT_TRANSACTION`*: Identificativo della transazione che viene generata per depositare il denaro sull'account destinatario.

Se il [Backend] è avviato sarà possibile accedere alla console di H2 tramite questo [URL](http://localhost:8080/h2-console).  
Per effettuare l'accesso le credenziali necessarie sono:
- [JDBC URL](./backend/src/main/resources/application.properties#L1): `jdbc:h2:file:./src/main/resources/h2_persistence`
- [Username](./backend/src/main/resources/application.properties#L3): `zorchi`
- [Password](./backend/src/main/resources/application.properties#L4): `password`

### Endpoint
*Per un dettaglio maggiore di ciascun endpoint e del controller che li gestisce è possibile rifarsi alla Javadoc presente all'interno del codice.*
- [`/api/active`](http://localhost:8080/api/active):
  - **`GET`**: Restituisce la lista di tutti gli account non eliminati.
- [`/api/account`](http://localhost:8080/api/account):
  - **`GET`**: Restituisce la lista di tutti gli account, eliminati o meno.
  - **`POST`**: Richiede un request body conforme alla classe [`AccountData`] per la creazione di un nuovo account.
  - **`DELETE`**: Richiede uno UUID conforme allo UUID di un account per l'eliminazione dello stesso.  
  L'eliminazione avviene tramite impostazione di una flag nell'entità account selezionata, in modo da mantenere l'integrità referenziale e uno storico degli account chiusi.
- [`/api/account/{id}`](http://localhost:8080/api/account/{id}):  
  *Per questo endpoint è necessario sostituire il placeholder `{id}`, anche detto PathVariable, con l'id di un account.*
  - **`GET`**: Restituisce le informazioni di un account e il suo storico dei movimenti, assieme ad un header custom.
  - **`POST`**: Richiede un request body conforme alla classe [`TransactionData`](./backend/src/main/java/zorchi/entities/Transaction.java#L74) per eseguire una transazione, ovvero un deposito o un prelievo a seconda dell'ammontare.
  - **`PUT`**: Richiede un request body conforme alla classe [`AccountData`] per modificare sia il nome che il congome di un account.
  - **`PATCH`**: Richiede un request body parzialmente conforme alla classe [`AccountData`] per modificare il nome o il congome di un account.
  - **`HEAD`**: Restituisce un header custom come da specifiche.
- [`/api/transfer`](http://localhost:8080/api/transfer): 
  - **`POST`**: Richiede un request body conforme alla classe [`TransferData`](./backend/src/main/java/zorchi/entities/Transfer.java#L102) per eseguire un trasferimento di denaro da un account a un altro.
- [`/api/divert`](http://localhost:8080/api/divert): 
  - **`POST`**: Richiede un request body conforme alla classe [`TransferDivertData`](./backend/src/main/java/zorchi/entities/Transfer.java#L161) per annullare una trasazione tramite l'esecuzione di una uguale ma inversa. 

L'endpoint `/api/active` è stato aggiunto oltre alle specifiche di base richieste per il [Backend].  
Inoltre sono state apportate le seguenti aggiunte alle specifiche di base richieste per gli endpoint:
- Per **`GET`** [`/api/account/{id}`](http://localhost:8080/api/account/{id}):  
  Aggiunti campi nel response body in modo da fornire informazioni aggiuntive per il [Frontend].
  Gli id passati in `history` del response body indicano se il movimento è una transazione, `sender` e `recipient` nulli, oppure un trasferimento, `sender` e `recipient` avvalorati.
  Almeno uno tra `sender` e `recipient`, se non nulli, corrisponderà alla PathVariable `{id}` poiché gli unici trasferimenti presenti nello storico saranno quelli che coinvolgono l'account specificato.
- Per **`POST`** [`/api/transfer`](http://localhost:8080/api/transfer):  
  Se viene inserito un ammontare negativo nel request body, tale ammontare diventa automaticamente positivo e l'operazione viene eseguita.
- Per gli endpoint con un response body custom:  
  Aggiunto campo `message` con un messaggio custom da poter mostrare a [Frontend].
- Per gli endpoint con un request body che include un valore numerico (`amount`):  
  Per attenersi al [principio di robustezza], il campo numerico `amount` se non specificato dove richiesto viene settato di default a 0. Inoltre, sebbene sia un campo numerico, se viene valorizzato come stringa che può essere parsata in numero allora verrà tradotta nel numero corrispondente.
- Per tutti gli endpoint:  
  Sempre in linea col [principio di robustezza], eventuali campi non richiesti inseriti nel request body vengono semplicemente ignorati.

[Backend]: #Backend
[Frontend]: #Frontend
[TypeScript]: https://www.typescriptlang.org/
[Angular 14]: https://angular.io/docs
[`h2_persistence.mv.db`]: backend\src\main\resources\h2_persistence.mv.db
[`AccountData`]: ./backend/src/main/java/zorchi/entities/Account.java#L174
[principio di robustezza]: https://en.wikipedia.org/wiki/Robustness_principle
