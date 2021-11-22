
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieSession = require("cookie-session");
const helmet = require("helmet");
// connexion à la base db mysql 
const mysql = require('./db/mysql_db');
//importation de morgan (logger http);
const morgan = require("morgan");

// module npm  independance qui charge les variables d environnement
require("dotenv").config();

// desactive le cache
const nocache = require("nocache");

const loginRoutes = require("./routes/login");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/poste");
const commentRoutes = require("./routes/comment");
const likeRoutes = require("./routes/like");

const app = express();
console.log("app.js fonctionnel");

// methode securite helmet
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// securise session
app.use(
  cookieSession({
    name: "session",
    secret: process.env.COOKIE_SECRET,
    cookie: {
      secure: true,
      httpOnly: true,
      domain: process.env.PORT,
    },
  })
);

// appel de fonction desactive cache
app.use(nocache());

app.use(bodyParser.json());

// traite image dans un fichier static
app.use("/images", express.static(path.join(__dirname, "images")));

// appel route
app.use(loginRoutes);
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(likeRoutes);

module.exports = app;