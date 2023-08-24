

import express from "express";
import {userRegister , Login , EditProfile , Chengepassword} from "../controller/user.js"

import upload from '../middleware/multer.js';
import VerifyToken from "../middleware/UserVerifyToken.js";
const route = express.Router();


route.get('/test',VerifyToken,(req, res)=>{
    res.json({success:'true'});
})
route.post('/signup',userRegister)
route.post('/login',Login);
route.post('/userprofileedit',VerifyToken,upload.single('image'), EditProfile)
route.post('/chengepassword',VerifyToken,Chengepassword)

export default route;