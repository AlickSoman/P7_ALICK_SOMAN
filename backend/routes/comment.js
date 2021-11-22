const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

// creation des routes de commentaire des utilisateurs modif get et supprimer commentaire

const commentaires = require("../controllers/comment");

// Create a new Commentaire
router.post("/commentaire", auth, commentaires.create);

// Retrieve all Commentaires
router.get("/commentaires", auth, commentaires.findAll);

// Retrieve a single Commentaire with commentaireId
router.get("/commentaire/:commentaireId", auth, commentaires.findOne);

// Update a Commentaire with commentaireId
router.put("/commentaire/:commentaireId", auth, commentaires.update);

// Delete a Commentaire with commentaireId
router.delete("/commentaire/:commentaireId", auth, commentaires.delete);

// Delete all Commentaires
router.delete("/commentaires", auth, commentaires.deleteAll);

module.exports = router;
