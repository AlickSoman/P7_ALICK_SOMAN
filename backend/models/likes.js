const mysql = require("mysql");
const connection = require("../db/mysql_db");

// Modele like
const Like = function (like) {
  this.post_id = like.post_id;
  this.user_id = like.user_id;
  //this.date_cree = poste.date_cree;
};

// create like
Like.createLike = (newLike, result) => {
  connection.query(`INSERT INTO likes SET ?`, newLike, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created like: ", { id: res.insertId, ...newLike });
    result(null, { id: res.insertId, ...newLike });
  });
};

// delete like with id
Like.remove = (id, result) => {
  connection.query("DELETE FROM likes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Commentaire with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted like with id: ", id);
    result(null, res);
  });
};

// delete All like
Like.getAll = (result) => {
  connection.query("SELECT * FROM likes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("likes: ", res);
    result(null, res);
  });
};

module.exports = Like;