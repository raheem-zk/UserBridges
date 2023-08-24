
import express from "express";
import { Action, Login, UsersData, DeleteUser,Dashboard } from "../controller/admin/adminController.js";
import VerifyToken from "../middleware/AdminVerifyToken.js";

const route = express.Router();
route.post('/login',Login);
route.get('/users',VerifyToken, UsersData);
route.get('/action/',VerifyToken,Action);
route.post('/deleteuser',VerifyToken,DeleteUser);
route.get('/',VerifyToken,Dashboard);

export default route;