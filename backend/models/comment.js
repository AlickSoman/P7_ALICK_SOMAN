const mysql = require("mysql");
const connection = require("../db/mysql_db");

// modele comment
const Commentaire = function (commentaire) {
  this.commentaires = commentaire.commentaires;
  this.post_id = commentaire.post_id;
  this.user_id = commentaire.user_id;
  //this.date_cree = commentaire.date_cree;
};

// cree un comment
Commentaire.create = (newCommentaire, result) => {
  connection.query(
    `INSERT INTO Commentaires SET ?, date_cree = NOW()`,
    // UPDATE Poster INNER JOIN Commentaires ON commentaires.post_id = poster.id SET nb_commentaires = nb_commentaires +1
    newCommentaire,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created commentaire: ", {
        id: res.insertId,
        ...newCommentaire,
      });
      result(null, { id: res.insertId, ...newCommentaire });
    }
  );
};

// find comment

Commentaire.findById = (commentaireId, result) => {
  connection.query(
    `SELECT * FROM Commentaires WHERE user_id = ${commentaireId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found commentaires: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Commentaire with the id
      result({ kind: "not_found" }, null);
    }
  );
};

// find All comment

Commentaire.getAll = (result) => {
  connection.query("SELECT * FROM Commentaires", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("commentaires: ", res);
    result(null, res);
  });
};

//update Comment

Commentaire.updateById = (post_id, commentaire, result) => {
  connection.query(
    "UPDATE Commentaires SET comment = ?, post_id = ?, updated_at = NOW() WHERE post_id = ?",
    [
      commentaire.commentaires,
      commentaire.user_id,
      post_id,
    ],
    (err, res) => {
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

      console.log("updated commentaire: ", { id: post_id, ...commentaires });
      result(null, { id: post_id, ...commentaires });
    }
  );
};

// delete one comment with id

Commentaire.remove = (id, result) => {
  connection.query("DELETE FROM Commentaires WHERE post_id = ?", id, (err, res) => {
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

    console.log("deleted commentaire with post_id: ", post_id);
    result(null, res);
  });
};

// delete All comment

Commentaire.removeAll = (result) => {
  connection.query("DELETE FROM Commentaires", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} commentaires`);
    result(null, res);
  });
};

module.exports = Commentaire;