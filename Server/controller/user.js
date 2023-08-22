import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userRegister = async (req, res)=>{
    try {
        const {username, email, phone, password } = req.body;
        console.log(req.body);
        const exisiteduser = await userModel.find({email, phone});
        console.log(req.body)
        console.log(exisiteduser,'==ex');
        if (exisiteduser.length !==0 ){
            return res.json({message:'User already exists'})
        }
        const hashPassword = await bcrypt.hash(password,10);
        const user = new userModel({username, email, phone, password:hashPassword });
        await user.save();
        console.log('User inserted successfully');
        res.json({message: 'success'});
    } catch (error) {
        console.log(error);
    }
}

const Login = async (req, res)=>{
    try {
        const {email, password} = req.body;
        console.log(req.body);
        const userData = await userModel.findOne({email});
        console.log('userData ',userData);
        if (!userData){
            return res.json({message:'User is not found!'});
        }
        const userValid = bcrypt.compareSync(password, userData.password);
        if(!userValid){
            return res.json({message:'password is wrong'});
        }
        const KEY = process.env.SECRECT_KEY;
        const Token = jwt.sign({userId: userData._id }, KEY, {expiresIn: 9999777})
        return res.json({message:'success', Token, userData});
    } catch (error) {
        console.log(error);
    }
}

export {
    userRegister,
    Login
}