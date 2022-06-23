# Progetto REST per Sistemi Distribuiti

## Membri Gruppo
Riccardo Chimisso - 866009  
Mauro Zorzin - 866001

---

## Descrizione
Progetto Endpoint REST di Sistemi Distribuiti.

Ipotetico applicativo Fullstack per un sistema bancario, suddiviso in Backend e Frontend.  
La parte di Backend si basa su Java e il framework Spring, mentre la parte di Frontend si basa su TypeScript e il framework Angular.

Il progetto è diviso in 2 sezioni: [frontend](./frontend/) e [backend](./backend/), strutturate singolarmente e trattabili come 2 progetti separati ma integrati fra loro.  
In entrambe le sezioni il codice è estensivamente documentato tramite Javadoc (Backend) e JSDoc (Frontend).

---

## Frontend
### Tecnologie
*Tutte le tecnologie utilizzate e le loro versioni sono presenti in dettaglio all'interno del [package.json](./frontend/package.json)*
- [NodeJs](https://nodejs.org/it/) 16.15.1 - gestione del progetto Frontend.
- [TypeScript](https://www.typescriptlang.org/) 4.7.2 - linguaggio principale utilizzato.
- [Angular 14](https://angular.io/docs) - framework principale per la realizzazione della logica frontend.
- [NgRx 14](https://next.ngrx.io/docs) - framework secondario per la gestione dei dati runtime (state) dell'applicazione.
- [SCSS](https://sass-lang.com/) - estensione di CSS.
### Struttura
Il lato Frontend del progetto segue la struttura di un progetto TypeScript con Angular.  
In particolare sotto [src/app/](./frontend/src/app/) sono presenti i vari componenti Angular e gestione dello stato di NgRx, divisi per scopo:
- [abstract/](./frontend/src/app/abstract/):  
  Contiene le definizioni astratte e generali di componenti comuni ai vari moduli.
- [core/](./frontend/src/app/core/):  
  Contiene tutti i fondamentali per il funzionamento del progetto, dalle definizioni di nuovi tipi e interfacce alla gestione dello state core dell'applicazione.  
  Contiene inoltre il servizio per la gestione delle chiamate HTTP ai vari endpoint del [Backend](#backend).
- [shared/](./frontend/src/app/shared/):  
  Contiene varie definizioni comuni a 2 o più moduli dell'applicazione.
- [features/](./frontend/src/app/features/):  
  Contiene i moduli principali dell'applicazione che gestiscono le interazioni con l'utente.
  - [accounts-list/](./frontend/src/app/features/accounts-list/):  
    Contiene le definizioni per la gestione della pagina adibita alla visualizzazione dell'elenco degli account bancari presenti nel sistema.
  - [app-overlay/](./frontend/src/app/features/app-overlay/):  
    Contiene le definizioni per la gestione degli overlay comuni a tutte le pagine, quali il banner, il loader visibile durante l'attesa di chiamate HTTP e il dialog che avverte l'utente degli errori nelle chiamate HTTP.
  - [home/](./frontend/src/app/features/home/):  
    Contiene le definizioni per la gestione della pagina home che permette una navigazione agevole tra le varie pagine dell'applicazione.
  - [root/](./frontend/src/app/features/root/):  
    Contiene le definizioni per la gestione della pagina adibita alla visualizzazione dello storico di un qualsiasi account bancario valido del sistema.
  - [transfer/](./frontend/src/app/features/transfer/):  
    Contiene le definizioni per la gestione della pagina adibita alla creazione di trasferimenti tra due account bancari validi del sistema.
  - [transaction/](./frontend/src/app/features/transaction/):  
    Contiene le definizioni per la gestione della pagina adibita alla creazione di transazioni per un account bancario valido del sistema.
### Endpoint
*Ogni path non esplicitamente mappato reindirizza alla pagina home*
- [/](http://localhost:4200/):  
  Enpoint root, fornisce la pagina root per lo storico di un account.
- [/home](http://localhost:4200/home):  
  Endpoint home, fornisce la pagina per la navigazione nell'applicazione.
- [/accounts-list](http://localhost:4200/accounts-list):  
  Endpoint accounts-list, fornisce la pagina per l'elenco degli account.
- [/transfer](http://localhost:4200/transfer):  
  Endpoint transfer, fornisce la pagina per le richieste di trasferimenti.
- [/transaction](http://localhost:4200/transaction):  
  Endpoint transaction, fornisce la pagina per le richieste di transazioni.

Gli endpoint `home`, `accounts-list` e `transaction` sono stati aggiunti oltre alle specifiche di base richieste per il Frontend.

---

## Backend
### Tecnologie
***Aggiungere link e correggere varie ed eventuali***
- Gradle - gestione del progetto Backend.
- Java 17 - linguaggio utilizzato.
- Spring - framework per la creazione di un applicativo REST.
- JPA - framework per la gestione della persistenza.
- Hibernate - framework per la gestione della persistenza.
### Struttura
Il lato Backend del progetto segue la struttura di un progetto Spring gestito da Gradle.  
In particolare sotto [src/main/java/zorchi/](./backend/src/main/java/zorchi/) sono presenti le varie classi Java annotate per funzionare con Spring e JPA, divise per scopo:
- [entities/](./backend/src/main/java/zorchi/entities/):  
  Contiene tutte le entità del sistema, quali [Account](./backend/src/main/java/zorchi/entities/Account.java), [Transaction](./backend/src/main/java/zorchi/entities/Transaction.java) e [Transfer](./backend/src/main/java/zorchi/entities/Transfer.java).  
  Contiene inoltre delle utili astrazioni delle varie entità e sottoclassi per la gestione delle richieste HTTP per la creazione o modifica delle entità.  
  Ciascuna classe è annotata con delle specifiche annotazioni per determinare come tali entità debbano essere gestite a livello di persistenza. 
- [repositories/](./backend/src/main/java/zorchi/repositories/):  
  Contiene tutte le [CrudRepository](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/CrudRepository.html) (Create Read Update Delete) che gestiscono le interazioni tra il codice Java e i dati persistiti.
- [responses/](./backend/src/main/java/zorchi/responses/):  
  Contiene le classi necessarie per la tipizzazione e la corretta strutturazione di alcune risposte HTTP, sia per l'eventuale body che per gli eventuali header aggiuntivi.
- [rest/](./backend/src/main/java/zorchi/rest/):  
  Contiene le classi principali dell'applicativo REST, ovvero la classe di bootstrap di Spring [RestApplication](./backend/src/main/java/zorchi/rest/RestApplication.java) e il controller [ApiController](./backend/src/main/java/zorchi/rest/ApiController.java) per la gestione degli endpoint.
- [utility/](./backend/src/main/java/zorchi/utility/):  
  Contiene alcune classi di utilità per semplificare la scrittura del codice e lo sviluppo.

Sotto [src/main/resources/](./backend/src/main/resources/) sono invece presenti le configurazioni per il database ([application.properties](backend\src\main\resources\application.properties)) e il database stesso ([h2_persistence.mv.db](backend\src\main\resources\h2_persistence.mv.db)).
### Database
Il file del database, [h2_persistence.mv.db](backend\src\main\resources\h2_persistence.mv.db), non è presente inizialmente nel progetto e verrà generato dopo il primo avvio del Backend.  
Lo schema del database è il seguente:
- [ACCOUNT](http://localhost:8080/h2-console/)
  - **UUID**: Identificativo a 10 byte (20 caratteri esadecimali) dell'account come da specifiche.
  - **BALANCE**: Double che rappresenza il saldo dell'account. Può andare in negativo (in rosso) solo tramite prelievi e in quello stato l'account potrà eseguire unicamente depositi, ovvero transazione con ammontare positivo.
  - **DELETED**: Booleano che indica se l'account è stato eliminato.
  - **NAME**: Nome del propietario dell'account.
  - **SURNAME**: Cognome del propietario dell'account.
- [TRANSACTION](http://localhost:8080/h2-console/)
  - **UUID**: Identificativo a 16 byte (32 caratteri esadecimali) della transazione come da specifiche.
  - **AMOUNT**: Double che rappresenza la quantità di denaro da prelevare, se negativa, o depositare, se positiva.
  - **DATE**: Data dell'operazione.
  - **ACCOUNT_UUID**: Identificativo dell'account che sta effettuando la transazione.
- [TRANSFER](http://localhost:8080/h2-console/)
  - **UUID**: Identificativo a 16 byte (32 caratteri esadecimali) del trasferimento come da specifiche.
  - **Amount**: Double che rappresenza lo quantità di denaro da trasferire, sempre positivo.
  - **DATE**: Data dell'operazione.
  - **SENDER_TRANSACTION**: Identificativo della transazione che viene generata per prelevare il denaro dall'account mittente.
  - **RECIPIENT_TRANSACTION**: Identificativo della transazione che viene generata per depositare il denaro sull'account destinatario.

### Endpoint
*Per un dettaglio maggiore di ciascun endpoint e del controller che li gestisce è possibile rifarsi alla Javadoc presente all'interno del codice.*
- [/api/active](http://localhost:8080/api/active):
  - **GET**: Restituisce la lista di tutti gli account non eliminati.
- [/api/account](http://localhost:8080/api/account):
  - **GET**: Restituisce la lista di tutti gli account, eliminati o meno.
  - **POST**: Richiede un request body conforme alla classe [AccountData](./backend/src/main/java/zorchi/entities/Account.java#174) per la creazione di un nuovo account.
  - **DELETE**: Richiede uno UUID conforme allo UUID di un account per l'eliminazione dello stesso.  
  L'eliminazione avviene tramite impostazione di una flag nell'entità account selezionata, in modo da mantenere l'integrità referenziale e uno storico degli account chiusi.
- [/api/account/{id}](http://localhost:8080/api/account/{id}):  
  *Per questo endpoint è necessario sostituire il placeholder "{id}", anche detto PathVariable, con l'id di un account.*
  - **GET**: Restituisce le informazioni di un account e il suo storico dei movimenti, assieme ad un header custom.
  - **POST**: Richiede un request body conforme alla classe [TransactionData](./backend/src/main/java/zorchi/entities/Transaction.java#74) per eseguire una transazione, ovvero un deposito o un prelievo a seconda dell'ammontare.
  - **PUT**: Richiede un request body conforme alla classe [AccountData](./backend/src/main/java/zorchi/entities/Account.java#174) per modificare sia il nome che il congome di un account.
  - **PATCH**: Richiede un request body parzialmente conforme alla classe [AccountData](./backend/src/main/java/zorchi/entities/Account.java#174) per modificare il nome o il congome di un account.
  - **HEAD**: Restituisce un header custom come da specifiche.
- [/api/transfer](http://localhost:8080/api/transfer): 
  - **POST**: Richiede un request body conforme alla classe [TransferData](./backend/src/main/java/zorchi/entities/Transfer.java#102) per eseguire un trasferimento di denaro da un account a un altro.
- [/api/divert](http://localhost:8080/api/divert): 
  - **POST**: Richiede un request body conforme alla classe [TransferDivertData](./backend/src/main/java/zorchi/entities/Transfer.java#161) per annullare una trasazione tramite l'esecuzione di una uguale ma inversa. 

L'endpoint `/api/active` è stato aggiunto oltre alle specifiche di base richieste per il Backend.

# Legacy README

## Sistema e tecnologie
- **Backend:**
  - Embedded database H2
  - JPA & Hibernate
  - FasterXML/jackson-core
- **Database:**
  - Posizione file DB (src/test/java/h2_persistence.mv.db)
  - URL: http://localhost:8080/h2-console
  - JDBC URL: jdbc:h2:file:./src/main/resources/h2_persistence
  - User Name: zorchi
  - Password: password

***Io la sezione seguente la metterei sotto Database.***
- **Gestione account eliminati:**  
  Quando gli account non vengono mai eliminati, in modo da poter sempre tenere traccia dello storico delle transazioni. Quando un account viene eliminato non e' piu' possibile modificare l'account (Eseguire depositi, prelievi e trasferimenti da e verso tale account) ad accezione della visualizzazione degli stessi.

***Ricordarsi di riportare le modifiche agli endpoint anche nell'elenco degli endpoint della nuova versione del readme.***   

- **Modifica GET("/api/account/{id}"):**          
  Aggiunti campi nella responce body in modo da fornire informazioni aggiuntive per il frontend
  (Maggiorni informazioni riguardanti l'account  indicato in id).
  Gli id passati nel responceBody indicano, in caso sender e recipient siano nulli una trasazione ( Deposito / Prelievo) altrimenti un trasverimento.
  I campi sender e recipient nel responceBody indicano da chi e verso dove il trasferimento avviene
  (Indicati con id degli account).
  Uno dei campi Sender e Recipient sara sempre l'accunt indicato {id} in modo da mostrare la correttezza dell'operazione.

  
- **Gestione amount in trasferimenti di denaro POST("/api/trasfer"):**  
  Se si inserisce un ammontare negativo per un trasferimento di denaro, tale ammontare viene automaticamente convertito in un ammontare positivo.
  L'operazione viene eseguita.
  //Pesudocodice
  es(Trasferimento FROM a To b con amount = -100) = (Trasferimento FROM a To b con amount = 100)
- **Message:**  
  Introdotto il paramentro message in alcuni responceBody per la visualizzazione di messagi frontEnd
- **Richieste con cambi aggiuntivi:**  
  Eventuali campi extra inseriti nell RequestBody vengono ignorati.
- [**Default amount:**](https://en.wikipedia.org/wiki/Robustness_principle)  
  In caso l'amount non venisse specificato dove richiesto, esso verrà settato a 0 come default.
- **Campi extra in request body**  
  I cambi non necessari specificati all'interno di una RequestBody vengono ingorati.


---

***Metterei la sezione seguente, senza parlare degli unit test (mai dire che c'è qualcosa che non va), all'interno della sezione Endpoint del Backend, specificando che sono solo degli esempi di request e response per un determinato endpoint chiamato con un determinato metodo HTTP.***
***Forse avrebbe senso mettere la sezione seguente nell'ISTRUZIONI dato che la consegna dice esplicitamente "In questo file [ISTRUZIONI] deve essere indicata una chiara modalità per poter eseguire e testare correttamente l'elaborato consegnato."***
## Esempi formati requestBody e responceBody
  Quelle che seguono sono un insieme di chiamate e risposte teste, che abbiamo svolto, con alcuni commenti sui campi aggiuntivi e modifiche fatte da noi. 
  
     
  Le chiamate sono in ordine cronologico e contengono gli effettivi id chiamati, quella che segue è una trascrizzione di un test eseguito manualemnte su Postman.

  - *requestBody* = Il contenuto della richiesta in formato JSON.

  - *responseBody:* = Il contenuto della risposta in formato JSON.

  - *responce* = Il codice di risposta atteso per la richiesta.   

  - *allResponce* = Tutti i codici di risposta attesi per quella chiamata in base al contesto da noi implementati.



  (Commenti indicati con //)

---
- **POST("/api/account"):**  
Crea un nuovo account.

  - *requestBody:* 
    ```json
    {
      "name": "name",
      "surname" : "surname"
    }
      ```
  - *responseBody:*
    ```json
    {
      "message": "Account creato con successo.",
      "id": "67DF54711F4DAA03E4E6"
    }
    ```
  - *responce:*   
    - [201(Created)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.2) :    
  Account creato correttamente.

  - *allResponce:*  
    - [400(Bad Request)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1) :   
  Le credeziali non sono valide.     
  Manca name o surname o entrambe.
  
---
- **GET("api/active")**   
Mostra tutti gli account attivi nel sistema eccetto quelli eliminati.

    - *requestBody:*  
    
    - *responceBody:*  
      ```json
      [
        {
          "name": "name",
          "surname": "surname",
          "balance": 0.0,

          //Indica se l'account è stato eliminato
          "deleted": false,

          "uuid": "67DF54711F4DAA03E4E6"
        },
        {
          "name": "Mauro",
          "surname": "Zorzin",
          "balance": 0.0,
          "deleted": false,
          "uuid": "E375D78848BCA522F581"
        },
        {
          "name": "Riccardo",
          "surname": "Chimisso",
          "balance": 0.0,
          "deleted": false,
          "uuid": "B58265B5C82C3FAB57ED"
        }
      ]
      ```
  - *responce:*   
    - [200(OK)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.1) :   
  Vengono restituire le informazioni.   

  - *allResponce:* 
---
- **POST("/api/account/67DF54711F4DAA03E4E6")**  
Esegue un deposito o un prelievo per un creciso account.


  - *requestBody:* 
    ```json
    {
      "amount": 100
    }
    ```

  - *responceBody:* 
    ```json
    {
      "message": "Transazione eseguita con successo.",
      "id": "B6895F2BC3B946B0BC1013FCA4D5D9B4",
      "movementActor": 
        {
          "newBalance": 100.0,
          "uuid": "67DF54711F4DAA03E4E6"
        }
    }
    ```
  - *responce:*   
    - [201(Created)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.2) :    
La tranzazione viene creata e registrata nel sistema.

  - *allResponce*   
    - [400(Bad Request)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1) :   
    Le credeziali non sono valide.   
    L'id non è in un formato accettabile. 
    - [404(Not Found)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4) :   
    L'id specificato non esiste o è stato cancellato.

---
- **POST("/api/transfer")**  
Esegue un trasferimento di denaro da un account ad un altro.

  - *requestBody:*  
    ```json
    {
      "amount": 10,
      "from": "67DF54711F4DAA03E4E6",
      "to": "E375D78848BCA522F581"
    }
    ```
  - *responceBody:*  

    ```json
    {
      "message": "Trasferimento eseguito con successo.",
      "id": "B82FDB1C2AE1423AA622A516D11E540E",
      "sender": 
        {
          "newBalance": 90.0,
          "uuid": "67DF54711F4DAA03E4E6"
        },
      "recipient": 
        {
          "newBalance": 10.0,
          "uuid": "E375D78848BCA522F581"
        }
    }
    ```
  - *responce:*   
    - [201(Created)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.2) :    
Il trasferimento è stato eseguito e la risorsa è stata creata.

  - *allResponce:*   
    - [400(Bad Request)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1) :   
    Le credeziali non sono valide.   
    Gli id non sono in un formato accettabile.
    Il bilancio dell'account non permette l'operazione.  
    - [404(Not Found)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4) : L'id specificato non esiste o è stato cancellato.

---
- **PUT("api/account/67DF54711F4DAA03E4E6")**  
Modifica il nome e il cognome di un account.

  - *requestBody:* 
    ```json
    {
      "name": "putNome",
      "surname": "putSurname"
        
    }
    ```
  - *responceBody:*

  - *responce:*   
      - [204(No Content)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.5) :   
       Richiesta riuscita, body vuoto.

  - *allResponce:*   
    - [400(Bad Request)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1) :   
    Le credeziali non sono valide.   
    L'id non è in un formato accettabile.  
    Manca o name o surname  o entrambi.   
    - [404(Not Found)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4) : L'id specificato non esiste o è stato cancellato.   
---
- **PATCH("api/account/67DF54711F4DAA03E4E6")**  
Modifica il nome o il congome di un account.   

  - *requestBody:* 
    ```json
    {
        "name": "patchName",  
    }
    ```
  - *responceBody:* 
  - *responce:*   
      - [204(No Content)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.5) :    
      Richiesta riuscita, body vuoto.

  - *allResponce:*   
    - [400(Bad Request)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1) :   
    Le credeziali non sono valide.   
    L'id non è in un formato accettabile.  
    Manca name o surname.   
    Sono stati specificati sia name che surname.   
    - [404(Not Found)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4) :    
    L'id specificato non esiste o è stato cancellato.   
---
- **HEAD("api/account?id=67DF54711F4DAA03E4E6")**

  - *requestBody:* 
  - *responceBody:*    
  - *responce:*   
  - *responce:*   
    - [200(OK)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.1) :   
  Vengono restituire informazioni nell'header.

  - *allResponce:*   
    - [400(Bad Request)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1) :   
    Le credeziali non sono valide.   
    l'id non è in un formato accettabile. 
    - [404(Not Found)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4) :    
    L'id specificato non esiste o è stato cancellato.  
---
- **POST("/api/divert")**  
Annulla un trasferimento, creando un trasferimento inverso.   

  - *requestBody:* 
    ```json
    {
      "id": "B82FDB1C2AE1423AA622A516D11E540E"    
    }
    ```
  - *responceBody:* 
    ```json
    {
      "message": "Trasferimento eseguito con successo."
    }
    ```
  - *responce:*   
    - [201(Created)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.2) :    
    Il trasferimento è stato eseguito e la risorsa è stata creata.

  - *allResponce:*   
    - [400(Bad Request)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1) :      
    l'id del trasferimento specificato non è in un formato accettabile.
    Il bilancio dell'account non permette l'operazione. 
    - [404(Not Found)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4) :    
    L'id specificato non esiste.

--- 
- **GET("api/account/67DF54711F4DAA03E4E6")**  
Mostra i dati completi di un account, compreso lo storico di tutte le trasazioni.   

  - *requestBody:* 
  - *responceBody:* 
```json
{
  "message": "Storico dell'account recuperato con successo.",
  "account": 
    {
      "name": "patchName",
      "surname": "putSurname",
      "balance": 100.0,
      "deleted": false,
      "uuid": "67DF54711F4DAA03E4E6"
    },
    "history": 
      [
        {
          "date": "2022-06-23T12:55:53.249+00:00",
          "uuid": "51A03D18C98F4E2F81555A146EB9CDE5",
          "amount": 10.0,
          "sender": "E375D78848BCA522F581",
          "recipient": "67DF54711F4DAA03E4E6"
        },
        {
          "date": "2022-06-23T12:28:31.123+00:00",
          "uuid": "B82FDB1C2AE1423AA622A516D11E540E",
          "amount": 10.0,
          "sender": "67DF54711F4DAA03E4E6",
          "recipient": "E375D78848BCA522F581"
        },
        {
          "date": "2022-06-23T12:20:46.253+00:00",
          "uuid": "B6895F2BC3B946B0BC1013FCA4D5D9B4",
          "amount": 100.0,
          "sender": null,
          "recipient": null
        }
      ]
  }
```
  - *responce:*   
    - [200(OK)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.1) :   
  Vengono restituire le informazioni.  
  - *allResponce:*   
    - [400(Bad Request)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1) :      
    L'id specificato non è in un formato accettabile.
    Il bilancio dell'account non permette l'operazione. 
    - [404(Not Found)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4) :    
    L'id specificato non esiste.
---
- **DEL("api/account?id=67DF54711F4DAA03E4E6")**  
Marchia un account come eliminato. Nessun account può essere effettivamente rimosso dalla base di dati.    
Un servizo bancario non permetterebbe di eliminare trasazioni o account per evitare richi sia di integrita che di frode.   

  - *requestBody:* 
  - *responceBody:*
  - *responce:*   
      - [204(No Content)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.5) :    
      Richiesta riuscita, body vuoto.

  - *allResponce:*   
    - [400(Bad Request)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1) :     
    L'id non è in un formato accettabile.     
    - [404(Not Found)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4) :    
    L'id specificato non esiste o è stato cancellato.   
---
- **GET("api/account")**  
Mostra tutti gli account nel sistema.

    - *requestBody:* 
    
    - *responceBody:*
      ```json
      [
        {
          "name": "patchName",
          "surname": "putSurname",
          "balance": 100.0,
          "deleted": true,
          "uuid": "67DF54711F4DAA03E4E6"
        },
        {
          "name": "Mauro",
          "surname": "Zorzin",
          "balance": 0.0,
          "deleted": false,
          "uuid": "E375D78848BCA522F581"
        },
        {
          "name": "Riccardo",
          "surname": "Chimisso",
          "balance": 0.0,
          "deleted": false,
          "uuid": "B58265B5C82C3FAB57ED"
        }
      ]
      ```
  - *responce:*   
    - [200(OK)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.1) :   
  Vengono restituire le informazioni.   

  - *allResponce:* 
---

