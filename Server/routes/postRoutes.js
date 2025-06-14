import express from "express";
import PostController from "../controllers/postController.js";

const router = express.Router();

// Public routes
router.get("/", PostController.getAllPosts);
router.get("/:id", PostController.getPostById);

// Protected/admin routes
router.post("/", PostController.createPost);
router.patch("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);

export default router;
