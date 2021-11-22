const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const users = require("../controllers/users");

const multer = require("../middleware/multer-config");
//users

// Retrieve all Users
router.get("/users", auth, users.findAllUsers);

// Retrieve a single User with posteId
router.get("/user/:userId", users.findUser);

// Update a User with userId
router.put("/user/:userId", auth, multer, users.updateUser);

// Delete a User with userId
router.delete("/user/:userId", auth, users.deleteUser);

// Delete all Users
router.delete("/users", users.deleteAllUsers);

module.exports = router;