const mysql = require("mysql");
const Like = require("../models/likes");
const Unlike = require("../models/dislikes");

// Create and Save a new Like
exports.createLike = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Like
  const like = new Like({
    post_id: req.body.post_id,
    user_id: req.body.user_id,
  });

  // Save Like in the database
  Like.createLike(like, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Like.",
      });
    else res.send(data);
  });
};

// Create and Save a new Unlike
exports.createUnlike = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a UnLike
  const unlike = new Unlike({
    post_id: req.body.post_id,
    user_id: req.body.user_id,
  });

  // Save Unike in the database
  Unlike.createUnlike(unlike, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Unlike.",
      });
    else res.send(data);
  });
};

// Delete a Like with the specified likeId in the request
exports.deleteLike = (req, res) => {
  Like.remove(req.params.likeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Like with id ${req.params.likeId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Like with id " + req.params.likeId,
        });
      }
    } else res.send({ message: `Like was deleted successfully!` });
  });
};

// Delete a Unlike with the specified unlikeId in the request
exports.deleteUnlike = (req, res) => {
  Unlike.remove(req.params.unlikeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Unlike with id ${req.params.unlikeId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Unlike with id " + req.params.unlikeId,
        });
      }
    } else res.send({ message: `Unlike was deleted successfully!` });
  });
};

// Retrieve all Likes from the database.
exports.findAllLikes = (req, res) => {
  Like.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving likes.",
      });
    else res.send(data);
  });
};

// Retrieve all Unlikes from the database.
exports.findAllUnlikes = (req, res) => {
  Unlike.getAllUnlikes((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving unlikes.",
      });
    else res.send(data);
  });
};
