const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mysql = require("mysql");
const maskData = require("maskdata");

// methode masquage email
const emailMaskOptions = {
  maskWith: "*",
  unmaskedStartCharactersBeforeAt: 2,
  unmaskedEndCharactersAfterAt: 1,
  maskAtTheRate: false,
};

// module knex pour faire des requetes sql asynchrone
const db = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: "db_groupomania",
  },
});

// signup

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json(`Missing ${!email ? "email" : "password"}!`);
    }
    const hash = await bcrypt.hash(req.body.password, 10);

    await db("user").insert({
      email: maskData.maskEmail2(req.body.email, emailMaskOptions),
      password: hash,
      nom: req.body.nom,
      prenom: req.body.prenom,
      // date_cree: new Date(),
    });


    res.status(200).json("Tous vas bien ");
  } catch (error) {
    if (error.error === 19) {
      res.status(400).json("Vous pouvez maintenant vous connecté avec votre email et mot de pass");
    } else 
    console.log(error);
    res.status(500).send("Oups ! une anomalie c'est produit en chemin");
    console.log("=====>imposible de créer l'utilisateur ====>:", error)
  }
};

// login

exports.login = async (req, res) => {
  try {
    const email = maskData.maskEmail2(req.body.email, emailMaskOptions);
    const password = req.body.password;

    if (!email || !password) {
      res.status(400).json(`Oups votre ${!email ? "email" : "password"}! n'est pas correct`);
    }

    const user = await db("user").first("*").where({ email: email });

    if (user) {
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        const token = jwt.sign({ userId: user.id }, process.env.TOKENSECRET, {
          expiresIn: "24h",
        });
        res.status(200).json({ userId: user.id, token: token });
      } else {
        res.status(401).json("Wrong password!");
      }
    } else {
      res.status(404).json("User not found!");
    }
  } catch (e) {
    // console.log(e); // Uncomment if needed for debug
    res.status(400).json("Oups ! probleme de connexion, veuillez vérrifier vos elements de connexion");
    console.log('erreur de connexion',e)
  }
};