const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
//const auth = require("../middleware/auth");
//const multer = require("../middleware/multer-config");

router.post("/", postCtrl.createPost);

router.delete("/:id", postCtrl.deletePost);

router.put("/:id", postCtrl.modifyPost);

router.get("/:id", postCtrl.getOnePost);

router.get("/", postCtrl.getAllPosts);

//router.post("/:id/like", auth, postCtrl.updateLikes);

module.exports = router;
