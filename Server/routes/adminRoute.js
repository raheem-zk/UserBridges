
import express from "express";
import { Action, Login, UsersData } from "../controller/admin/adminController.js";
import VerifyToken from "../middleware/verifyToken.js";

const route = express.Router();
route.post('/login',Login);
route.get('/users',UsersData);
route.get('/action/:id',Action)

export default route;