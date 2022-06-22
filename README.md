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

Sviluppato e testato su un sistema Windows 10 x64 bit.  
L'editor principale e consigliato è Visual Studio Code.

---

## Frontend
### Tecnologie
*Tutte le tecnologie utilizzate e le loro versioni sono presenti in dettaglio all'interno del [package.json](./frontend/package.json)*
- [NodeJs](https://nodejs.org/it/) 16.15.1
- [TypeScript](https://www.typescriptlang.org/) 4.7.2
- [Angular 14](https://angular.io/docs)
- [NgRx 14](https://next.ngrx.io/docs)
- [SCSS](https://sass-lang.com/)
- HTML5
### Struttura
Il lato Frontend del progetto segue la struttura di un progetto Angular.  
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

Gli endpoint home, accounts-list e transaction sono stati aggiunti oltre alle specifiche di base richieste per il Frontend.
### Elementi codice principali
- [ApiService](./frontend/src/app/core/services/api-service.service.ts):  
  Bla bla bla
- etc.  
  etc.

---

## Backend
### Tecnologie
*Eventuale disclaimer*
- Elenco puntato
### Struttura
Introduzione struttura:
- Elenco puntato.
### Endpoint
*Eventuale disclaimer*
- Elenco puntato.

Aggiunte rispetto alla traccia.
### Elementi codice principali
- Elenco puntato

# Legacy README

## Sistema e tecnologie
*Sviluppato e Testato su un sistema Windows 10 x64bit*
- **Backend:**
  - Il codice da eseguire per l'avvio del server è posizionato nella cartella backend del progetto
  - Scritto in Java 17
  - Framework Spring
  - Gestore Progetto Gradle
  - Embedded database H2
  - JPA & Hibernate
  - FasterXML/jackson-core
- **Database:**
  - Posizione file DB (src/test/java/h2_persistence.mv.db)
  - URL: http://localhost:8080/h2-console
  - JDBC URL: jdbc:h2:file:./src/main/resources/h2_persistence
  - User Name: zorchi
  - Password: password

## Backend
- **Formato requestBody:** JSON
- **Gestione account eliminati:**  
  Quando gli account non vengono mai eliminati, in modo da poter sempre tenere traccia dello storico delle transazioni. Quando un account viene eliminato non e' piu' possibile modificare l'account (Eseguire depositi, prelievi e trasferimenti da e verso tale account) ad accezione della visualizzazione degli stessi.
- **Aggiunto endpoint GET("/api/active"):**  
  Esso che mostra esclusivamente gli account non eliminati.
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

---

## Esempi formati requestBody e responceBody
  Non siamo riusciti a scrivere degli unit test soffisfacenti, quelle che seguono sono un insieme ri chiamate e risposte teste, che abbiamo svolto, con alcuni commenti sui campi aggiuntivi e modifiche fatte da noi. 
  Dovrebbe forire un minimo di contesto sulla nostra implementazione.

  (Commenti indicati con //)


- **POST("/api/account"):**  
  *requestBody:* 
  ```json
    {
      "name": "name",
      "surname" : "surname"
    }
  ```
  *responseBody:*
  ```json
    {
      "uuid": "97468FE245BEF9D81042",
    }
  ```

- GET("api/account")

    requestBody : ""

    responceBody :
[
    {
        "name": "nameA",
        "surname": "nameA",
        "balance": 100.0,
        "deleted": true,  // Indica se l'accunt e' stato cancellato: true = cancellato, false = attivo
        "uuid": "97468FE245BEF9D81042"
    },
    {
        "name": "nameB",
        "surname": "nameB",
        "balance": 0.0,
        "deleted": false,
        "uuid": "DE7BC97FE8876D99A663"
    },
    {
        "name": "nameC",
        "surname": "nameC",
        "balance": 0.0,
        "deleted": false,
        "uuid": "A4E8BA65FC5C537DC477"
    }
]


- DEL("api/account?id={id}")

    requestBody : ""

    responceBody : ""

- GET("api/account/{id}")

    requestBody : ""

    responceBody : 
{
    "message": "", //Il campo e' presente per passare messaggi da visualizzare frontEnd, deriva da classa astratta, qui non viene mostrato nessun messaggio
    "account": {
        "name": "nameA",
        "surname": "nameA",
        "balance": 100.0,
        "deleted": true,
        "uuid": "97468FE245BEF9D81042"
    },
    "history": [    // Array di tutte le transazioni
        {
            "date": "2022-06-20T18:09:11.468+00:00",
            "uuid": "D54350150F1041A6B83ECE5E650760D1",
            "amount": 0.0,
            "sender": "97468FE245BEF9D81042",
            "recipient": "97468FE245BEF9D81042"
        }
        {
            "date": "2022-06-20T14:49:53.468+00:00",
            "uuid": "FE751CB77D7042E99615A27CA31E70AD", // Id di un trasferimento
            "amount": 0.0,
            "sender": "97468FE245BEF9D81042",
            "recipient": "97468FE245BEF9D81042"
        },
        {
            "date": "2022-06-20T13:57:16.525+00:00",
            "uuid": "FD89F1F31CC3467AA83C36470532706D", // Id di una trasazione
            "amount": 100.0,
            "sender": null,
            "recipient": null
        }
    ]
}

- POST("/api/account/{id}")

    requestBody : 
{
    "amount": 100
}

    responceBody : 
{
    "message": "Transazione eseguita con successo.", // Messaggio di conferma da mostrare Frontend
    "id": "FD89F1F31CC3467AA83C36470532706D",       //  L'id della trasazione
    "movementActor": {
        "newBalance": 100.0,
        "uuid": "97468FE245BEF9D81042"
    }
}

- PUT("api/account/{id}")

    requestBody : 
{
    "name": "newName",
    "surname": "newSurname"
}

    responceBody : "" 

- PATCH("api/account/{id}")

    requestBody : 
{
    "name": "newName",  
}

    responceBody : "" 

- HEAD("api/account?id={id}")

    requestBody : ""

    responceBody : ""  

- POST("/api/transfer")

    requestBody : 
{
    "amount" : 0,
    "to" : "97468FE245BEF9D81042",
    "from" : "97468FE245BEF9D81042"
    
}

    responceBody :
{
    "message": "Trasferimento eseguito con successo.",
    "id": "FE751CB77D7042E99615A27CA31E70AD",
    "sender": {
        "newBalance": 100.0,
        "uuid": "97468FE245BEF9D81042"
    },
    "recipient": {
        "newBalance": 100.0,
        "uuid": "97468FE245BEF9D81042"
    }
}  

- POST("/api/divert")

    requestBody : 
{
    "id": "D54350150F1041A6B83ECE5E650760D1"
    
}

    responceBody : ""

- GET("/api/account/{id}") // Non mostra gli account cancellati

    requestBody : ""

    responceBody :
[
    {
        "name": "nameB",
        "surname": "nameB",
        "balance": 0.0,
        "deleted": false,
        "uuid": "DE7BC97FE8876D99A663"
    },
    {
        "name": "nameC",
        "surname": "nameC",
        "balance": 0.0,
        "deleted": false,
        "uuid": "A4E8BA65FC5C537DC477"
    }
]

