const express = require("express");
const router = express.Router();

const verifyPassword = require("../middleware/password");
const verifyEmail = require("../middleware/email");

// module npm blocant les attaque de force bloque l utilisateur si il rentre trop de requetes
const rateLimit = require("express-rate-limit");
//limite la connexion abusive
const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutes
  max: 5, // limit each IP to 3 requests per windowMs
  message: "trop de requete abusive , vous devez attendre 3 minutes",
});

const log = require("../controllers/login");
//inscription et log

// Create a new User
router.post("/signup", verifyPassword, verifyEmail, log.signup);
// Retrieve a single User with userId
router.post("/login", limiter, log.login);

module.exports = router;