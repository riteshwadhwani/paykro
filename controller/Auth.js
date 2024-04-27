const User = require('../models/User');
const jwt = require("jsonwebtoken");

const user_signup = async (req,res) =>{
    try {
        const {firstName,lastName,email,password} = req.body;
        if(!firstName || !lastName || !email || !password){
            return res.status(401).json({
                sucess:false,
                message:"All fields are required"
            })
        }
        const existing_user = await User.findOne({email});
        if(existing_user){
            return res.status(401).json({
                sucess:false,
                message:"User Already Exists"
            })
        }
        const created_user =await User.create({
            firstName,lastName,email,password
        })
        
        const token = jwt.sign({email,password},process.env.JWT_SECRET,{
            expiresIn:"3d"
        })
        res.json({
            success:true,
            created_user,
            token:token,
        })
    } catch (error) {
        return res.status(401).json({
            sucess:false,
            message:"Error while creating the User"
        })
    }
};

const user_login = async(req,res) =>{
    try {
        const {email,password} = req.body;
        const existing_user = await User.findOne({email});
        if(!existing_user){
            return res.status(401).json({
                sucess:false,
                message:"User Not Registered Yet"
            })
        }
        if(existing_user.password !== password){
            return res.status(401).json({
                sucess:false,
                message:"Invalid Credentials"
            })
        }
        const token = jwt.sign({email,password},process.env.JWT_SECRET,{
            expiresIn:"3d"
        })
        res.json({
            sucess :true,
            existing_user,
            token :token,
        })
    } catch (error) {
        return res.status(401).json({
            sucess:false,
            message:"Error while LoggIn"
        })
    }
}

const changeCredentials = async (req,res) =>{
    try {
        const {firstName,lastName,password} = req.body;
        const {id} = req.user.id;
        const user = User.findById({id});
    
        user.firstName = firstName;
        user.lastName = lastName;
        user.password = password;
    
        await user.save();
    } catch (error) {
        return res.status(401).json({
            sucess:false,
            message:" Error while updating credentials"
        })
        
    }


}
module.exports = {user_signup,user_login,changeCredentials};