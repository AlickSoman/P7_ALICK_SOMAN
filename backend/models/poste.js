const mysql = require("mysql");
const connection = require("../db/mysql_db");

// Modele post
const Poste = function (poste) {
  this.titre = poste.titre;
  this.description = poste.description;
  this.post_img = poste.post_img;
  this.commentaires = poste.commentaires;
  this.likes = poste.likes;
  this.post_id = poste.post_id;
  this.dislikes = poste.dislikes;
  
};

// create post
Poste.create = (newPoste, result) => {
  connection.query(
    `INSERT INTO Poster SET ?, created_at = NOW()`,
    newPoste,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created poste: ", { id: res.insertId, ...newPoste });
      result(null, { id: res.insertId, ...newPoste });
    }
  );
};

//find post with id
Poste.findById = (post_id, result) => {
  connection.query(`SELECT * FROM Poster WHERE id = ${post_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found poste: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Poste with the id
    result({ kind: "not_found" }, null);
  });
};

// find All post
Poste.getAll = (result) => {
  connection.query(
    "SELECT id , titre, description, post_img, user_id, created_at, CONCAT_WS(' ', DAY(created_at),'/',MONTH(created_at),'/', YEAR(created_at) , ' à: ', TIME(created_at)) AS jolie_date FROM Poster",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("postes: ", res);
      result(null, res);
    }
  );
};

// update post
Poste.updateById = (id, poste, result) => {
  connection.query(
    "UPDATE Poster SET titre = ?, description = ?, post_img = ?, updated_at = NOW() WHERE id = ?",
    [
      poste.titre,
      poste.description,
      poste.post_img,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Poste with the id
        //le poste n'a pas ete trouver par l'id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated poste: ", { id: id, ...poste });
      result(null, { id: id, ...poste });
    }
  );
};

// delete post with id -supprimer le post ratacher à l'id
Poste.remove = (id, result) => {
  connection.query("DELETE FROM Poster WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Poste with the id --
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted poste with id: ", id);
    result(null, res);
  });
};

// delete All post
Poste.removeAll = (result) => {
  connection.query("DELETE FROM Poster", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} postes`);
    result(null, res);
  });
};

module.exports = Poste;