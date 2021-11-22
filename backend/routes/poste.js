const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// creation des routes de post des utilisateurs modif get et supprimer post

const postes = require("../controllers/poste");

// Create a new Poste
router.post("/poste", auth, multer, postes.create);

// Retrieve all Postes
router.get("/postes", auth, postes.findAll);

// Retrieve a single Poste with posteId
router.get("/poste/:posteId", auth, postes.findOne);

// Update a Poste with posteId
router.put("/poste/:posteId", auth, postes.update);

// Delete a Poste with posteId
router.delete("/poste/:posteId", auth, postes.delete);

// Delete all Postes
router.delete("/postes", auth, postes.deleteAll);

module.exports = router;