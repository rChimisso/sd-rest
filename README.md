# Membri Gruppo

Riccardo Chimisso -
Mauro Zorzin - 866001

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

- Gestione account eliminati:
    Quando gli account non vengono mai eliminati, in modo da poter sempre tenere traccia dello storico delle transazioni. Quando un account viene eliminato non e' piu' possibile modificare l'account (Eseguire depositi, prelievi e trasferimenti da e verso tale account) ad accezione della visualizzazione degli stessi.

- Aggiunto endpoint GET("/api/active"):
    Esso che mostra esclusivamente gli account non eliminati.

- Modifica GET(/api/account/{id})
    Aggiunti campi nella responce body in modo da fornire informazioni aggiuntive per il frontend
    (Maggiorni informazioni riguardanti l'account  indicato in id).
    Gli id passati nel responceBody indicano, in caso sender e recipient siano nulli una trasazione ( Deposito / Prelievo) altrimenti un trasverimento.
    I campi sender e recipient nel responceBody indicano da chi e verso dove il trasferimento avviene
    (Indicati con id degli account).

- Message
    Introdotto il paramentro message in alcuni responceBody per la visualizzazione di messagi frontEnd

