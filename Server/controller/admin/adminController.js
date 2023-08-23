
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
        const Token = jwt.sign({adminId: adminData._id }, KEY, {expiresIn: 9999777})
        return res.json({message:'success', Token, adminData});
    } catch (error) {
        console.log(error, 'admin login error');
    }
}

const UsersData = async (req, res)=>{
    try {
        const usersData = await userModel.find({});
        res.json({usersData});
    } catch (error) {
        console.log(error);
    }
}

const Action = async (req, res)=>{
    const id = req.params.id;
    console.log(req);
    await userModel.updateOne({_id: id}, {$set: {status: false}})
    .then((result)=>{
        console.log(result);
        res.json({result});
    })
    .catch((error)=>{
        console.log(error);
    })
}
export {
    Login,
    UsersData,
    Action
}