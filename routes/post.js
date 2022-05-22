import express from "express";
import { createPost, deletePost, modifyPost, getOnePost, getAllPosts } from "../controllers/post.js";
import auth from "../middlewares/auth.js";

//const multer = require("../middleware/multer-config");

const router = express.Router();

router.post("/", auth, createPost);

router.delete("/:id", deletePost);

router.put("/:id", auth, modifyPost);

router.get("/:id", getOnePost);

router.get("/", auth, getAllPosts);

//router.post("/:id/like", auth, postCtrl.updateLikes);

export { router };
