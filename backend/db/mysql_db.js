// require("dotenv").config();

//import les variables d'environnement
const dotenv = require('dotenv');
const result = dotenv.config();

const mysql = require("mysql2");
// connection a la bdd
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  //port: '3000',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

let sql = "SELECT * FPRM users";
console.log(sql)

//test dans la console
connection.connect( function (err) {
  if(err){
    console.log(`erreur de connexion : ${err}`);
  } else{
    console.log("connecté à la base de données - db_groupomania ok");
    console.log(`id de connexion ${connection.threadId}`);
  }
});


connection.query("SELECT * FROM db_groupomania.users", function (error, result, fields) {
  if (error) throw error;{
  console.log(" Erreur dans la table Users = " +error);
  console.log(" Contenu de la table Users = ",result);
} 
  
});


connection.query("SELECT * FROM db_groupomania.Postes", function (error, result, fields) {
  if (error) throw error;
  console.log(" Erreur dans la table Users = " +error);
  console.log(" Contenu de la table Poste = ",result);
});


module.exports = connection;