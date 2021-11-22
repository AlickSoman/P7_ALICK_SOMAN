const mysql = require("mysql");
const User = require("../models/users");
const fs = require("fs");

// Find a single User with a userId
exports.findUser = (req, res) => {
  User.findById(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.user_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.user_id,
        });
      }
    } else res.send(data);
  });
};

// Retrieve all Users from the database.
exports.findAllUsers = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

// Update a User identified by the userId in the request
exports.updateUser = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const user = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    user_img: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null,
  });

  //save user

  User.updateById(req.params.user_id, user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.user_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating User with id " + req.params.user_id,
        });
      }
    } else res.send(data);
  });
};

// Delete a User with the specified userId in the request
exports.deleteUser = (req, res) => {
  User.findById(req.params.user_id, (err, user, data) => {
    if (user.user_img !== null) {
      const filename = user.user_img.split("/images/")[1];

      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.user_id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.params.user_id,
          });
        }
      } else {
        fs.unlink(`images/${filename}`, () => {
          User.remove(req.params.user_id, (err, data) => {
            res.send({ message: `User was deleted successfully!` });
          });
        });
      }
    } else {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.user_id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.params.user_id,
          });
        }
      } else {
        User.remove(req.params.user_id, (err, data) => {
          res.send({ message: `User was deleted successfully!` });
        });
      }
    }
  });
};

// Delete all Users from the database.
exports.deleteAllUsers = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};