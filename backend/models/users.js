const mysql = require("mysql");
const connection = require("../db/mysql_db");

// constructor modele user
const User = function (user) {
  this.user_id = user.user_id
  this.email = user.email;
  this.password = user.password;
  this.nom = user.nom;
  this.prenom = user.prenom;
  this.user_img = user.user_img;
};

// find user with id
User.findById = (user_id, result) => {
  connection.query(`SELECT * FROM users WHERE user_id = ${user_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found users: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });

};

// find All user
User.getAll = (result) => {
  connection.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

// update user with id
User.updateById = (user_id, users, result) => {
  connection.query(
    `UPDATE users SET nom = ?, prenom = ?, user_img = ?, updated_at = NOW() WHERE user_id = ?`,
    [
      /*user.email,
      user.mdp,*/
      user.nom,
      user.prenom,
      user.user_img,
      user_id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated users: ", { id: user_id, ...users });
      result(null, { id: user_id, ...users });
    }
  );
};

//delete user with id
User.remove = (user_id, result) => {
  connection.query("DELETE FROM users WHERE user_id = ?", user_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", user_id);
    result(null, res);
  });
};

// delete All user
User.removeAll = (result) => {
  connection.query("DELETE FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;
