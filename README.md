# Progetto - Applicazioni e Servizi Web.

Realizzazione di un sito Web E-Commerce. La nostra proposta è quella di sviluppare una piattaforma  per la distribuzione di videocorsi relativi al fitness. Le funzionalità principali ricoperte per i videocorsi sono: 
* Vengono mostrati e aggiornati in tempo reale sulla piattaforma.
* Essi sono acquistabili con dei token (forma di denaro virtuale appositamente simulata).
* Ciascuno di essi è prodotto da un personal trainer e può essere usufruito da N utenti.

Ad esso si aggiungono ulteriori funzionalità secondarie, tra cui: 
* Gestione dei permessi sulla base del ruolo ricoperto al momento di login (Staff/Utente).
* Inserimento di una "profile page" per ogni utente con relativi dati associati e corsi acquistati.
* Possibilità di vedere quante persone hanno acquistato un videocorso e quante altre lo stanno visionando.

Possibili funzionalità falcoltative:
* Filtraggio dei corsi sulla base di uno specifico personal trainer.
* Creazione di una pagina dedicata all'acquisto di nuovi token, con relativo aggiornamento del saldo.
* Possibilità per l'utente di recensire un videocorso (like/dislike o commento).
* Possibilità per un personal trainer di effettuare una live (con partecipazione a pagamento).

## Installazione e funzionamento.

1. Assicurarsi di aver correttamente installato [Node.js](https://nodejs.org/en) e [MongoDB](https://www.mongodb.com/try/download/community).
2. Aprire il progetto con l'IDE che si preferisce (consiglio: [VisualStudio Code](https://code.visualstudio.com/)).
3. Installare come plugin al suo interno [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (e disabilita Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
4. Inoltre, aggiungiere i plugin [ESLint](https://eslint.org/) e Prettier (facoltativo, ma fortemente suggerito).
5. Aprire il terminale dentro l'IDE ed digitare i seguenti comandi:
#### Project Setup

```sh
npm install
```
#### Compile and Minify for Production

```sh
npm run build
```

##### Compile and Hot-Reload for Development

```sh
npm run dev
```

Nota: per eventuali problemi con [ESLint](https://eslint.org/) usare
```sh
npm run lint
```

A questo punto nel terminale dovrebbe partire il tool per l'esecuzione di Vue3, chiamato "VITE v4.3.5" e dovrebbe apparire una cosa simile:
![Immagine di vite (?)](https://user-images.githubusercontent.com/53586012/175346743-897f440d-6b3c-41b8-b3c4-9fd14124088b.png)

e a questo punto premere il pulsante "o" della tastiera avendo selezionato il terminale per aprire il progetto Vue3 nel browser e visualizzare il frotend.

6. Un altro step da seguire per permettere la comunicazione tra il l'applicazione e il DB di MongoDB, è l'utilizzo del comando "node .\src\backend\server.js", che
andrà sempre eseguita dentro una shell all'interno della cartella (nel nostro caso utilizziamo direttamente il terminale di Visual Studio Code)

## Configurazione di MongoDB.
1. Accertarsi di aver correttamente installato la versione community di [MongoDB](https://www.mongodb.com/try/download/community).
   Attenzione: scaricare una versione che sia meno recente della 6.0.8+ , (consiglio la 5.0.19) poiché le versioni più recenti rimuovono il file "mongo".
2. Installato l'msi proseguire con l'installazione senza passi particolari, quando chiederà di installare MongoDB Compass, accettare.
3. A questo punto MongoDB farà partire i servizi in automatico e l'installazione sarà correttamente ultimata.
   Attenzione: nel caso in cui ci sia un problema di autorizzazione all'esecuzione dei servizi di MongoDB, bisogna accedere alle variabili d'ambiente;
   sotto "Path" aggiungere il path assoluto della cartella "bin" la quale contiene gli eseguibili di MongoDB (tipicamente questa si trova sotto C:>Programmi>MongoDB>Server>bin) preceduta da "initialText;".
   Dunque, avrete una cosa del tipo:
   "initialText;C:\Program Files\MongoDB\Server\5.0\bin" all'interno di "Path". Premete OK e accertatevi che sia tutto salvato.
4. A questo punto aprite il cmd e digitate per far partire il server MongoDB:
   ```
   "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe"
   ```
5. Aprite un nuovo cmd (lasciando inalterato quello precedentemente aperto) come amministratore e digitate:
   ```
   "C:\Program Files\MongoDB\Server\5.0\bin\mongo.exe"
   ```
6. A questo punto sarete collegati correttamente alla shell di MongoDB (da cui potrete manipolare database).
7. Per poter vedere i database tramite GUI e quindi usando MongoDB Compass. Aprirlo, inserire nella connessione (mentre si hanno i terminali ancora aperti)
   ```
   mongodb://127.0.0.1:27017
   ```
   Attenzione: sostituire la parte in "localhost" con "127.0.0.1", altrimenti potrebbe non funzionare.
8. Premete connect, e sarete connessi in localhost a MongoDB, congratulazioni.
9. Una volta connessi tramite l'utilizzo di MongoDB Compass, è necessario creare un nuovo database, il cui campo "Database Name" sarà "UserDB", e come "Collection Name" aggiungere una collection "users"; Dopodichè una volta che il DB è stato creato, con la collection users, è necessario aggiungerne un'altra, il cui nome sarà "categories".

## Tecnologie utilizzate.

Per quanto riguarda la struttura del sistema questa utilizza MongoDB, Express, Vue, Node (MEVN). Per la gestione degli utenti si è scelto di utilizzare un database di tipo documentale NoSQL: MongoDB, per la storicizzazione dei loro dati e tutto ciò ad essi associato. Mentre, la comunicazione Client-Server utilizza Express e Node.js per il backend e Vue.js per il frontend, l'esecuzione di quest'ultimo è supportata da Vite.js. Abbiamo anche considerato l'utilizzo della libreria Socket.io per aggiornare in tempo reale le principali componenti condivise dell'E-Commerce.

## Contributing
 Leo Marzoli -  leo.marzoli@studio.unibo.it

 Federico Pirazzoli - federico.pirazzoli@studio.unibo.it

 Lorenzo Massone - lorenzo.massone@studio.unibo.it
