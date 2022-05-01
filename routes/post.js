import express from "express";
import { createPost, deletePost, modifyPost, getOnePost, getAllPosts } from "../controllers/post.js";
//const auth = require("../middleware/auth");
//const multer = require("../middleware/multer-config");

const router = express.Router();

router.post("/", createPost);

router.delete("/:id", deletePost);

router.put("/:id", modifyPost);

router.get("/:id", getOnePost);

router.get("/", getAllPosts);

//router.post("/:id/like", auth, postCtrl.updateLikes);

export { router };
