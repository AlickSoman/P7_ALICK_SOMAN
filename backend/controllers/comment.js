const mysql = require("mysql");
const Commentaire = require("../models/comment");

// Create and Save a new Commentaire
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Commentaire
  const commentaire = new Commentaire({
    commentaires: req.body.commentaires,
    post_id: req.body.post_id,
    user_id: req.body.user_id,
    date_cree: req.body.date_cree,
  });

  // Save Commentaire in the database
  Commentaire.create(commentaire, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Commentaires.",
      });
    else res.send(data);
  });
};

// Retrieve all Commentaires from the database.
exports.findAll = (req, res) => {
  Commentaire.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving commentaires.",
      });
    else res.send(data);
  });
};

// Find a single Commentaire with a commentaireId
exports.findOne = (req, res) => {
  Commentaire.findById(req.params.commentaireId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Commentaire with id ${req.params.commentaireId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Commentaire with id " + req.params.commentaireId,
        });
      }
    } else res.send(data);
  });
};

// Update a Commentaire identified by the CommentaireId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Commentaire.updateById(
    req.params.commentaireId,
    new Commentaire(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Commentaire with id ${req.params.commentaireId}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating Commentaire with id " + req.params.commentaireId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Commentaire with the specified commentaireId in the request
exports.delete = (req, res) => {
  Commentaire.remove(req.params.commentaireId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Commentaire with id ${req.params.commentaireId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete Commentaire with id " + req.params.commentaireId,
        });
      }
    } else res.send({ message: `Commentaire was deleted successfully!` });
  });
};

// Delete all Commentaires from the database.
exports.deleteAll = (req, res) => {
  Commentaire.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all commentaires.",
      });
    else res.send({ message: `All Commentaires were deleted successfully!` });
  });
};
