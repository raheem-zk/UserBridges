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
        if(userData.status===false){
            return res.json({message:'User is Blocked'});
        }
        const userValid = bcrypt.compareSync(password, userData.password);
        if(!userValid){
            return res.json({message:'password is wrong'});
        }
        const KEY = process.env.SECRECT_KEY;
        // { user:email, role: 'user' }
        const token = jwt.sign({ user:email, role: 'user' }, KEY, { expiresIn: '1h' })
        return res.json({message:'success', token, userData});
    } catch (error) {
        console.log(error);
    }
}

const EditProfile = async (req, res)=>{
    try {
        const {username, email, phone, id} = req.body;
        const image = req?.file ? req?.file?.filename : req?.body?.image;
        await userModel.updateOne({_id: id}, {$set:{username, email, phone, image}})
        .then((result)=>{
            console.log(result);
            return res.json({message:'success', image});
        })
        .catch((err)=>{
            return res.json({message:'error'});
        })
    } catch (error) {
        console.log(error);
    }
}

const Chengepassword = async (req, res)=>{
    try {
        const {currentPassword, newPassword, confirmNewPassword, id} = req.body;
        console.log(req.body);
        const userData = await userModel.findOne({_id: id});
        console.log(userData);
        if(!userData){
            return res.json({message: 'server side error'});
        }
        const validateCurrentPassword = bcrypt.compareSync(currentPassword, userData.password);

        if (!validateCurrentPassword) {
            return res.json({ message: 'The current password is incorrect.' });
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);
        await userModel.updateOne({_id: id},{$set: {password: hashPassword}})
        .then((result)=>{
            return res.json({message:'success'});
        })
        .catch((err)=>{
            return res.json({message: err});
        })
    } catch (error) {
        console.log(error);
    }
}
export {
    userRegister,
    Login,
    EditProfile,
    Chengepassword
}