# Membri Gruppo

Riccardo Chimisso -
Mauro Zorzin - 866001

# Sistema e tecnologie

- Sviluppato e Testato su un sitsma Windows 10 x64bit

- Backend : 
            - Il codice da eseguire per l'avvio del server e' posizionato nella cartella backend del progetto
            - Scritto in Java 17
            - Framework Spring
            - Gestore Progetto Gradle
            - Embedded database H2 
            - JPA & Hibernate
            - FasterXML/jackson-core

- Database:
            - posizione file DB (src/test/java/h2_persistence.mv.db)
            - URL : http://localhost:8080/h2-console
            - JDBC URL : jdbc:h2:file:./src/main/resources/h2_persistence
            - User Name : zorchi
            - Password : password

- Fronend : 
            - HTML5
            - SCSS
            - Anguler 14 (NgRx 14-rc.0)
            - TypeScript 4.7.2
            - Node 16.15.1
            - ESLint 8.17.0

# Descrizione Progetto
Progetto Endpoint REST di Sistemi Distribuiti.

In questo file devono essere indicati nome, cognome e matricola di ogni componente
del gruppo.  
Eventualmente e' possibile inserire una descrizione o introduzione al lavoro che
il gruppo ha svolto, per meglio comprendere l'architettura del sistema implementato. In
caso di espansione dalle specifiche del progetto, questo e' il file dove indicare la descrizione
di quanto svolto.

# FrontEnd



# BackEnd

- Formato requestBody: JSON

- Gestione account eliminati:
    Quando gli account non vengono mai eliminati, in modo da poter sempre tenere traccia dello storico delle transazioni. Quando un account viene eliminato non e' piu' possibile modificare l'account (Eseguire depositi, prelievi e trasferimenti da e verso tale account) ad accezione della visualizzazione degli stessi.

- Aggiunto endpoint GET("/api/active"):
    Esso che mostra esclusivamente gli account non eliminati.

- Modifica GET("/api/account/{id}")
    Aggiunti campi nella responce body in modo da fornire informazioni aggiuntive per il frontend
    (Maggiorni informazioni riguardanti l'account  indicato in id).
    Gli id passati nel responceBody indicano, in caso sender e recipient siano nulli una trasazione ( Deposito / Prelievo) altrimenti un trasverimento.
    I campi sender e recipient nel responceBody indicano da chi e verso dove il trasferimento avviene
    (Indicati con id degli account).
    Uno dei campi Sender e Recipient sara sempre l'accunt indicato {id} in modo da mostrare la correttezza dell'operazione.


- Gestione amount in trasferimenti di denaro POST("/api/trasfer")
    Se si inserisce un ammontare negativo per un trasferimento di denaro, tale ammontare viene automaticamente convertito in un ammontare positivo.
    L'operazione viene eseguita.

    //Pesudocodice
    es(Trasferimento FROM a To b con amount = -100) = (Trasferimento FROM a To b con amount = 100)
    


- Message
    Introdotto il paramentro message in alcuni responceBody per la visualizzazione di messagi frontEnd

- Richieste con cambi aggiuntivi
    Eventuali campi extra inseriti nell RequestBody vengono ignorati.



# Esempi formati requestBody e responceBody

    Non siamo riusciti a scrivere degli unit test soffisfacenti, quelle che seguono sono un insieme ri chiamate e risposte teste, che abbiamo svolto, con alcuni commenti sui campi aggiuntivi e modifiche fatte da noi. 
    Dovrebbe forire un minimo di contesto sulla nostra implementazione.

    (Commenti indicati con //)


- POST("/api/account")
    requestBody :
{
    "name": "name",
    "surname" : "surname"
}
    responceBody:
{
    "uuid": "97468FE245BEF9D81042",
}


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

