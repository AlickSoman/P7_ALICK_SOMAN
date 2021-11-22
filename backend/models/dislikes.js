const mysql = require("mysql");
const connection = require("../db/mysql_db");;

// modele dislike
const Unlike = function (unlike) {
  this.post_id = unlike.post_id;
  this.user_id = unlike.user_id;
  //this.date_cree = poste.date_cree;
};

//create unlike
Unlike.createUnlike = (newUnlike, result) => {
  connection.query(
    `INSERT INTO dislikes SET ?`,
    newUnlike,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created unlike: ", { id: res.insertId, ...newUnlike });
      result(null, { id: res.insertId, ...newUnlike });
    }
  );
};

// delete like with id
Unlike.remove = (id, result) => {
  connection.query(
    "DELETE FROM dislikes WHERE id = ?",
    id,
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

      console.log("deleted Unlike with id: ", id);
      result(null, res);
    }
  );
};

// find All like
Unlike.getAllUnlikes = (result) => {
  connection.query("SELECT * FROM dislikes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("unlikes: ", res);
    result(null, res);
  });
};
module.exports = Unlike;