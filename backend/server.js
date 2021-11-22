//importer le package HTTP de node.js pour la création du serveur
const http = require('http');

//import l'application express app.js
const app = require('./app');

//import les variables d'environnement
const dotenv = require('dotenv');
const result = dotenv.config();

//paramètrage du port avec la méthode set de express
//proteger par les par (process.env.PORT)
app.set('port', process.env.PORT);

//createServer() qui prend en argument la fonction qui sera 
//executé à chaque requête fait à notre serveur ( les fonctions 
// se trouve dans app.js)
const server = http.createServer(app);
//les serveur écoutes les requêtes sur PORT ...
server.listen(process.env.PORT, console.log(`ecoute le port ${process.env.PORT}`));

