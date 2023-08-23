
import express from "express";
import { Action, Login, UsersData, DeleteUser,Dashboard } from "../controller/admin/adminController.js";
import VerifyToken from "../middleware/verifyToken.js";

const route = express.Router();
route.post('/login',Login);
route.get('/users',UsersData);
route.get('/action/',Action);
route.post('/deleteuser',DeleteUser);
route.get('/',Dashboard);

export default route;