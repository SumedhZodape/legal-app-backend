import UserModel from '../models/Users.js';
import { generateToken } from '../utils/generateToken.js';
import bcrypt from 'bcrypt'


export const Register = async(req, res) =>{
    // logic

    let { name, email, Phone, password, role } = req.body;

    if(!name || !email || !Phone || !password || !role){
        return res.status(400).json({ message:"All fileds are required!" })
    }

    try {
        const existingUser = await UserModel.findOne({ email: email });

        if(existingUser){
            return res.status(400).json({message:"User already exist!"})
        }

        const user = await UserModel.create({
            name,
            email,
            Phone,
            password,
            role
        })

        res.status(201).json({
            message:"User Registered successfully!",
            result: {
                _id: user._id,
                name,
                email,
                Phone
            }
        })

    } catch (error) {
        res.status(500).json({message: "Server Error", error})
    }


}

export const Login = async(req, res)=>{

    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Email and Password are required!"})
    }

    try {

        const existingUser = await UserModel.findOne({email})
    
        if(!existingUser){
            return res.status(400).json({message: "Invalid email!"})
        }
    
        const isMatch = await bcrypt.compare(password, existingUser.password)

        if(!isMatch){
            return res.status(404).json({message:"Invalid Password!"})
        }

        res.status(200).json({
            message:"Login Successfully!",
            token: generateToken(existingUser._id, existingUser.email),
            result: {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server Error", error})
    }


}