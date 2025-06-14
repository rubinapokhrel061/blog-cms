import Post from "../models/blogpost.js";

class PostController {
  // GET All
  static async getAllPosts(req, res) {
    try {
      const posts = await Post.find().sort({ date: -1 });
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to retrieve posts.",
        error: error.message,
      });
    }
  }

  // GET by id
  static async getPostById(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found." });
      }
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to retrieve post.",
        error: error.message,
      });
    }
  }

  // POST
  static async createPost(req, res) {
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }

    if (!content) {
      return res.status(400).json({ message: "Content is required." });
    }

    try {
      const newPost = new Post({ title, content });
      const savedPost = await newPost.save();
      return res.status(201).json({
        message: "Post created successfully.",
        post: savedPost,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Failed to create post.",
        error: error.message,
      });
    }
  }

  // PATCH
  static async updatePost(req, res) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found." });
      }

      return res.status(200).json({
        message: "Post updated successfully.",
        post: updatedPost,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Failed to update post.",
        error: error.message,
      });
    }
  }

  // DELETE
  static async deletePost(req, res) {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);

      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found." });
      }

      return res.status(200).json({ message: "Post deleted successfully." });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to delete post.",
        error: error.message,
      });
    }
  }
}

export default PostController;
