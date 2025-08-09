import express from 'express'
import { 
  createPost, 
  getUserPosts, 
  getPostById,      // import new controllers
  updatePost, 
  deletePost 
} from '../controllers/postControllers.js'

const router = express.Router();

router.post("/post", createPost);
router.get("/getpost", getUserPosts);

// New routes for single post
router.get("/:id", getPostById);          // Get single post by ID
router.put("/:id", updatePost);           // Update post by ID
router.delete("/:id", deletePost);        // Delete post by ID

export default router;
