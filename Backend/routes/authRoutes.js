import express from 'express';
import {signup,login,logout,getCurrentUser} from '../controllers/authControllers.js';

const router = express.Router()

router.post('/signup',signup);
router.post('/login',login);
router.get('/logout',logout);
router.get('/user',getCurrentUser);
router.get("/user", getCurrentUser); 
export default router;