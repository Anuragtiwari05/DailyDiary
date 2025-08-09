import Post from "../models/post.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();


// Helper: Get logged-in user's ID from cookie token
const getUserIdFromToken = (req) => {
  const token = req.cookies.token;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch {
    return null;
  }
};

export const createPost = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ message: "Not authenticated" });

    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const post = new Post({ user: userId, title, content });
    await post.save();

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ message: "Not authenticated" });

    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getPostById = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post) return res.status(404).json({message:"post not found"})
            res.json(post)
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const updatePost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
         if (!post) return res.status(404).json({ message: "Post not found" });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    await post.save();
    res.json(post);
    } catch (error) {
         res.status(500).json({ message: "Server error" });

    
    }
}



export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await Post.deleteOne({ _id: req.params.id });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);  // <-- Log error details
    res.status(500).json({ message: "Server error while deleting post" });
  }
};
