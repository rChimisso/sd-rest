# ***Istruzioni di Installazione, Sviluppo e Testing***

## **Membri gruppo**
Riccardo Chimisso - 866009  
Mauro Zorzin - 866001

---

## **Installazione e Sviluppo**
Sviluppato e testato su un sistema Windows 10 a 64 bit.  
L'architettura a 64 bit è necessaria per poter sviluppare e lanciare il progetto.

### **IDE**
L'IDE utilizzato, meglio integrato e consigliato è Visual Studio Code, sia per il Backend che per il Frontend.  
Per installarlo è sufficiente recarsi a [questa pagina](https://code.visualstudio.com/download) e scaricare la versione per il proprio sistema operativo.  
Durante la procedura di installazione è consigliato spuntare le caselle delle opzioni di installazione come segue (con quella per l'icona desktop a scelta libera):  
***INSERIRE IMMAGINE***  
È anche possibile utilizzare Eclipse per il Backend o IntelliJ per Backend e Frontend, sebbene Eclipse sia fortemente sconsigliato per via di incosistenze e complicazioni nella formattazione del codice e nell'interpretazione di caratteri Unicode.
### **Dipendenze e avvio Backend**
Per poter avviare il Backend è necessario installare la [JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html).  
A seconda dell'IDE scelto seguire i passi appropriati.  
Qui sono riportati i passi da seguire per Visual Studio Code:
- Cliccare col tasto destro sulla cartella [backend](./backend/) per aprire il menù contestuale e selezionare la voce `Apri con Code`.  
- Una volta apertosi il progetto comparirà una notifica come sotto per installare le estensioni raccomandate. Cliccare su `Install`.  
In caso non vengano installate le estensioni raccomandate è possibile installarle in un secondo momento aprendo il file [extensions.json](./backend/.vscode/extensions.json) e cercando gli ID di ciascuna estensione nell'apposita sezione sulla barra laterale.  
***INSERIRE IMMAGINE***  
- Attendere che la build del progetto si concluda, visibile da una notifica in basso a destra.
- Premere il pulsante Run in alto a destra o, una volta aperto il file [`RestApplication`](./backend/src/main/java/zorchi/rest/RestApplication.java), cliccare sulla scritta `Run` sopra la [riga del metodo main](./backend/src/main/java/zorchi/rest/RestApplication.java#L20).
- Il Backend sarà ora disponibile all'indirizzo `http://localhost:8080`.
### **Dipendenze e avvio Frontend**
Per poter avviare il Frontend è necessario installare [NodeJs] 16.15.1.  
È consigliato, ma non necessario, utilizzare il software [nvm] per installare [NodeJs] in modo da poter gestire facilmente le versioni di [NodeJs] installate in caso sia presente la necessità di averne più di una.  
Per installare [NodeJs] è sufficiente recarsi alla pagina linkata e seguire le istruzioni dell'installer.  
Se si volesse installare [NodeJs] tramite [nvm] invece le istruzioni sono presente nel [readme](https://github.com/nvm-sh/nvm#readme) di [nvm].

In seguito è necessario posizionarsi con un terminale, sia quello integrato nel sistema operativo o quello integrato in VSC, e lanciare il comando
```
npm i
```
per installare le dipendenze presenti nel [package.json](./frontend/package.json).

Completata l'installazione delle dipendenze e trovandosi col terminale nella stessa cartella di cui sopra, per lanciare il Frontend bisogna lanciare il comando
```
npm run start
```
oppure utilizzare la sezione `NPM Script` di VSC che si trova in basso a sinistra e premere il pulsante Run affianco allo script `start`.

Completata l'esecuzione dello script la pagina Frontend sarà disponibile all'indirizzo [`http://localhost:4200`](http://localhost:4200).

Per lo sviluppo è consigliato:
- Cliccare col tasto destro sulla cartella [frontend](./frontend/) per aprire il menù contestuale e selezionare la voce `Apri con Code`.  
- Una volta apertosi il progetto comparirà una notifica come sotto per installare le estensioni raccomandate. Cliccare su `Install`.  
In caso non vengano installate le estensioni raccomandate è possibile installarle in un secondo momento aprendo il file [extensions.json](./backend/.vscode/extensions.json) e cercando gli ID di ciascuna estensione nell'apposita sezione sulla barra laterale.

---

## **Testing**

### **Frontend**
Una volta che il servizio è stato avviato è possibile connettersi alle seguenti pagine:   
**Home** [`/home`](http://localhost:4200/home)

![HOME](./img/home.png)
Dalla Home è possibile navigare verso le altre pagine.  
Schiacciando sull'icona della piccola casetta in alto a sinistra è possibile tornare a questa pagina in qualsiasi momento da qualsiasi altra pagina.

Dal menù si può accedere, partendo da sinistra a:  
**Elenco account** [`/accounts-list`](http://localhost:4200/accounts-list)

![ELENCO_ACCOUNT](./img/elenco_account.png)
In questa pagina è possibile visualizzare le informazioni di tutti gli account nel sistema (UUID, Nome, Cognome, Saldo).

Spuntando la checkbox in basso a sinistra è possibile visualizzare anche tutti gli account eliminati. La checkbox persiste il suo ultimo stato selezionato anche dopo aver navigato verso altre pagine.

![ELENCO_ALL_ACCOUNT](./img/all_elenco_account.png)

**Storico account** [`/`](http://localhost:4200/)

![STORICO_ACCOUNT](./img/storico_account.png)
In questa pagina è possibile inserire uno UUID all'interno di un'apposito input etichettato `Account ID` e, premendo sul pulsante `Ricerca`, verranno visualizzate tutte le informazioni dell'account inserito.

Per l'input `Account ID` sono presenti dei controlli di validazione dell'input inserito che prevengono l'inserimento di caratteri non esadecimali e input più lunghi di 20 caratteri.  
Inoltre il pulsante `Ricerca` si abiliterà soltanto se tutti i requisiti per l'input `Account ID` sono stati soddisfatti.

**Trasferimento** [`/transfer`](http://localhost:4200/transfer)

![TRASFERIMENTO](./img/trasferimento.png)
In questa pagina è possibile eseguire un trasferimento di denaro da un account a un altro.

Si inseriscono i due UUID negli appositi input `ID Mittente` e `ID Destinatario` e si specifica la quantità che si desidera trasferire.   
Infine cliccando sul pulsante `Esegui` verrà inoltrata la richiesta di trasferimento al Backend, per poi visualizzare un dialog che informa dell'esito dell'operazione.

Gli input `ID Mittente` e `ID Destinatario` hanno controlli di validazione uguali a quelli di `Account ID` della pagina **Storico account**, mentre l'input dell'ammontare impedisce l'inserimento di qualunque carattere che non rappresenti un numero positivo con massimo 2 cifre decimali.

Messaggio di successo:

![TRASFERIMENTO_R1](./img/trasferiemnto1_result.png)

Messaggio di errore:

![TRASFERIMENTO_R2](./img/trasferimento2_result.png)

**Transazione** [`/transaction`](http://localhost:4200//transaction)

![TRANZAZIONE](./img/tranzazione.png)
In questa pagina è possibile eseguire una transazione per un determinato account, ovvero un deposito o un prelievo.

Si inserisce lo UUID dell'account nell'apposito campo e si specifica l'ammontare della transazione, positivo per un deposito o negativo per un prelievo.   
Infine cliccando sul pulsante `Esegui` verrà inoltrata la richiesta di trasferimento al Backend, per poi visualizzare un dialog che informa dell'esito dell'operazione, esattamente come per la pagina **Trasferimento**.

Gli input `Account ID` e  dell'ammontare hanno controlli di validazione uguali a quelli della pagina **Trasferimento**, con la differenza che qui l'ammontare può anche essere negativo.

---

### API
Quelle che seguono sono un insieme di chiamate e risposte test che abbiamo svolto, con alcuni commenti sui campi aggiuntivi e modifiche da noi apportate.  
Le chiamate sono in ordine cronologico e contengono gli effettivi id chiamati,  tutte le chiamate sono state eseguite manualmente attraverso [Postman](https://www.postman.com/downloads/).

---

**Legenda:**
- *requestBody*: Il contenuto della richiesta in formato JSON.
- *responseBody*: Il contenuto della risposta in formato JSON.
- *response*: Il codice di risposta atteso per la richiesta.   
- *allResponses*: Tutti i codici di risposta attesi per quella chiamata in base al contesto da noi implementato.
- Commenti indicati con `//`.

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
  - *response:*   
    - [201 (Created)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.2):  
    Account creato correttamente.
  - *allResponses:*  
    - [400 (Bad Request)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1):  
    Le credeziali non sono valide. Manca name o surname o entrambe.

---

- **GET("api/active")**   
Mostra tutti gli account nel sistema eccetto quelli eliminati.
  - *requestBody:* -
  - *responseBody:*
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
  - *response:*   
    - [200 (OK)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.1):  
    Vengono restituire le informazioni.   
  - *allResponses:* -

---

- **POST("/api/account/67DF54711F4DAA03E4E6")**  
Esegue un deposito o un prelievo per un account.
  - *requestBody:* 
    ```json
    {
      "amount": 100
    }
    ```
  - *responseBody:* 
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
  - *response:*   
    - [201 (Created)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.2):  
    La transazione viene creata e registrata nel sistema.
  - *allResponses:*   
    - [400 (Bad Request)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1):  
    Le credeziali non sono valide.  
    L'id non è in un formato accettabile.
    - [404 (Not Found)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4):  
    L'id specificato non esiste o è stato cancellato.

---

- **POST("/api/transfer")**  
Esegue un trasferimento di denaro da un account a un altro.
  - *requestBody:*  
    ```json
    {
      "amount": 10,
      "from": "67DF54711F4DAA03E4E6",
      "to": "E375D78848BCA522F581"
    }
    ```
  - *responseBody:*  
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
  - *response:*   
    - [201 (Created)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.2):    
Il trasferimento è stato eseguito e la risorsa è stata creata.

  - *allResponses:*   
    - [400 (Bad Request)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1):  
    Le credeziali non sono valide.  
    Gli id non sono in un formato accettabile.  
    Il bilancio dell'account non permette l'operazione.  
    - [404 (Not Found)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4):  
    L'id specificato non esiste o è stato cancellato.

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
  - *responseBody:* -
  - *response:*
    - [204 (No Content)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.5):  
    Richiesta riuscita, body vuoto.
  - *allResponses:*
    - [400 (Bad Request)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1):   
    Le credeziali non sono valide.  
    L'id non è in un formato accettabile.  
    Manca o name o surname o entrambi.  
    - [404 (Not Found)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4):  
    L'id specificato non esiste o è stato cancellato.

---

- **PATCH("api/account/67DF54711F4DAA03E4E6")**  
Modifica il nome o il congome di un account.   
  - *requestBody:*
    ```json
    {
        "name": "patchName",  
    }
    ```
  - *responseBody:* -
  - *response:*
    - [204 (No Content)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.5):    
    Richiesta riuscita, body vuoto.
  - *allResponses:*   
    - [400 (Bad Request)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1):   
    Le credeziali non sono valide.  
    L'id non è in un formato accettabile.  
    Mancano name e surname.  
    Sono stati specificati sia name che surname.
    - [404 (Not Found)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4):  
    L'id specificato non esiste o è stato cancellato.

---

- **HEAD("api/account?id=67DF54711F4DAA03E4E6")**
  - *requestBody:* -
  - *responseBody:* -
  - *response:*
    - [200 (OK)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.1):  
    Vengono restituire informazioni nell'header.
  - *allResponses:*
    - [400 (Bad Request)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1):   
    Le credeziali non sono valide.  
    L'id non è in un formato accettabile.
    - [404 (Not Found)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4):  
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
  - *responseBody:*
    ```json
    {
      "message": "Trasferimento eseguito con successo."
    }
    ```
  - *response:*
    - [201 (Created)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.2):  
    Il trasferimento è stato eseguito e la risorsa è stata creata.
  - *allResponses:*
    - [400 (Bad Request)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1):  
    L'id del trasferimento non è in un formato accettabile.  
    Il bilancio dell'account non permette l'operazione.
    - [404 (Not Found)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4):  
    L'id specificato non esiste.

---

- **GET("api/account/67DF54711F4DAA03E4E6")**  
Mostra i dati completi di un account, compreso lo storico di tutte le trasazioni.   
  - *requestBody:* -
  - *responseBody:* 
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

                //UUID di un trasferimento.
              "uuid": "B82FDB1C2AE1423AA622A516D11E540E",

              "amount": 10.0,
              "sender": "67DF54711F4DAA03E4E6",
              "recipient": "E375D78848BCA522F581"
            },
            {
              "date": "2022-06-23T12:20:46.253+00:00",

                //UUID di un transazione.
              "uuid": "B6895F2BC3B946B0BC1013FCA4D5D9B4",

              "amount": 100.0,
              "sender": null,
              "recipient": null
            }
          ]
      }
    ```
  - *response:*   
    - [200 (OK)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.1):  
    Vengono restituire le informazioni.  
    Se `sender` e `recipient` sono null si tratta di un prelievo/deposito, altrimenti è un trasferimento.
  - *allResponses:*
    - [400 (Bad Request)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1):  
    L'id specificato non è in un formato accettabile.  
    Il bilancio dell'account non permette l'operazione.
    - [404 (Not Found)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4):  
    L'id specificato non esiste.

---

- **DELETE("api/account?id=67DF54711F4DAA03E4E6")**  
Segna un account come eliminato. 
  - *requestBody:* -
  - *responseBody:* -
  - *response:*
      - [204 (No Content)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.5):  
      Richiesta riuscita, body vuoto.
  - *allResponses:*
    - [400 (Bad Request)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1):  
    L'id non è in un formato accettabile.
    - [404 (Not Found)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4):  
    L'id specificato non esiste o è stato cancellato.

---

- **GET("api/account")**
Mostra tutti gli account nel sistema.
    - *requestBody:* -
    - *responseBody:*
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
  - *response:*
    - [200 (OK)](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.1):  
    Vengono restituire le informazioni.   
  - *allResponses:* -

[NodeJs]: https://nodejs.org/
[nvm]: https://github.com/nvm-sh/nvm
