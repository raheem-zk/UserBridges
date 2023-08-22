

import express from "express";
import {userRegister , Login } from "../controller/user.js"

const route = express.Router();

route.post('/signup',userRegister)
route.post('/login',Login);

export default route;