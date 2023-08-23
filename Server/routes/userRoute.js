

import express from "express";
import {userRegister , Login , EditProfile , Chengepassword} from "../controller/user.js"

import upload from '../middleware/multer.js';
const route = express.Router();

route.post('/signup',userRegister)
route.post('/login',Login);
route.post('/userprofileedit',upload.single('image'), EditProfile)
route.post('/chengepassword',Chengepassword)

export default route;