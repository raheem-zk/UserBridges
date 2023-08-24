
import adminModel from "../../model/adminModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../../model/userModel.js';
const Login = async (req, res)=>{
    try {
        const {email, password} = req.body;
        console.log(req.body);
        const adminData = await adminModel.findOne({email})
        if (!adminData){
            return res.json({message:'Invalid email or password. Please try again.'})
        }
        const isPasswordCorrect  = await bcrypt.compare(password, adminData.password);
        if (!isPasswordCorrect){
            return res.json({message:'Invalid password. Please try again.'})
        }
        const KEY = process.env.SECRECT_KEY;
        const token = jwt.sign({ user:email, role: 'admin' }, KEY, {expiresIn: '1h'});
        return res.json({message:'success', token, adminData});
    } catch (error) {
        console.log(error, 'admin login error');
    }
}

const UsersData = async (req, res)=>{
    try {
        console.log(req.headers);
        const usersData = await userModel.find({});
        res.json({usersData});
    } catch (error) {
        console.log(error);
    }
}

const Action = async (req, res)=>{
    const id = req.query.id;
    const status = req.query.status;
 
    console.log(id, status);
    await userModel.updateOne({_id: id}, {$set: {status: status}})
    .then((result)=>{
        console.log(result);
        res.json({message:'success'});
    })
    .catch((error)=>{
        console.log(error);
    })
}

const DeleteUser = async (req, res)=>{
    try {
        const id = req.body.id;
        console.log(id);
        const result = await userModel.deleteOne({_id:id});
        if (result.deletedCount === 1){
            console.log(result);
            return res.json({message:'User deleted successfully'});
        }
        console.log(result);

        return res.json({message: 'An error occurred'});
    } catch (error) {
        console.log(error);
    }
}

const Dashboard = async (req, res)=>{
    const blockedUserCount = await userModel.countDocuments({status: false})
    const userCount = await userModel.countDocuments({});
    if (userCount || blockedUserCount){
        res.json({blockedUserCount, userCount})
    }
}

export {
    Login,
    UsersData,
    Action,
    DeleteUser,
    Dashboard
}