const express = require("express");
const router = express.Router();

const likers = require("../controllers/like");
const auth = require("../middleware/auth");

// Create a new Like
router.post("/likes", auth, likers.createLike);
// Create a new UNlike
router.post("/unlikes", auth, likers.createUnlike);

// Delete a Like with likeId
router.delete("/like/:likeId", auth, likers.deleteLike);
// Delete a UnLike with unlikeId
router.delete("/unlike/:unlikeId", auth, likers.deleteUnlike);

// Retrieve all Likes
router.get("/likes", auth, likers.findAllLikes);
// Retrieve all Unlikes
router.get("/unlikes", auth, likers.findAllUnlikes);

module.exports = router;