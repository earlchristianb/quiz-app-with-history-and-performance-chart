import { Request, Response } from "express";
import { signinDTO, signupDTO, UserDTO } from "../dto";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import config from 'config';
import log from "../utils/logger";


export const signup =async (req:Request,res:Response) => {
    const dto: signupDTO = req.body;
    console.log('signup')

    try {
   

        const findExistingUser = await User.findOne({ email: dto.email });
        console.log(findExistingUser)
        if (findExistingUser) {
            return res.json({message:'Email already taken'});
        }
        
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const newUser = new User({
        email: dto.email,
        hashedPassword: hashedPassword,
        userName:dto.userName
        });
        const result: UserDTO = await newUser.save();
        if (result) {

            const token: string = await signToken(result.email, result._id);
            return res.json({
            token,
            userDetails:
            {
                email: result.email,
                _id: result._id,
                image: result.image,
                userName:result.userName,
            }
                , message: 'Logged in',
                sucess:true,
            
        });
        }
        
    } catch (error) {
      return res.json({ success: false, message: "Something went wrong" });
    }
   
}

export const signin = async (req: Request, res: Response) => {
    try {
        log.info('signin')
    const dto: signinDTO = req.body;
    const findExistingUser: UserDTO | null = await User.findOne({ email: dto.email });
    if (!findExistingUser) return res.json({ message: 'Incorrect Email or password' });
    const pwMatch =await bcrypt.compare(dto.password, findExistingUser.hashedPassword);
    if (!pwMatch) { return res.json({ message: "Incorrect Password" }); }
    if (pwMatch) {
        
        const token: string = await signToken(findExistingUser.email, findExistingUser._id);
      
        return res.json({
            token,
            userDetails:
            {
                email: findExistingUser.email,
                _id: findExistingUser._id,
                image: findExistingUser.image,
                userName:findExistingUser.userName,
            }
            , message: 'Logged in',
            sucess:true,
        });
    }
    } catch (error) {
        return res.json({ success: false, message: "Something went wrong" });
    }
   
}


export const signToken=async(email:string, id:string)=>{
    const token: string = jwt.sign({ email: email, id:id }, <string>process.env.JWT_SECRET, { expiresIn: "30m" });
    return token;
}