import { Request, Response } from "express";
import { update } from "lodash";
import { UserDTO } from "../dto";
import User from "../models/user.model";
import v2 from '../utils/cloudinary'


export const updateUserName = async (req:Request,res:Response) => {
    
    type userUpdateName = {
        userName:string
    }

    console.log(req.body)
    const updatedName:userUpdateName = req.body;
    const _id: string = req.signedCookies.id;
    try {
        const updatedUserName = await User.findByIdAndUpdate(_id, updatedName, { new: true })
        
        if (updatedUserName) {
            
            return res.json({
                userDetails: {
                 email:updatedUserName.email,
                _id: updatedUserName._id,
                image: updatedUserName.image,
                userName:updatedUserName.userName,
            },message:"Update Successful",success:true})
        }
    } catch (error) { 
    
        console.log(error);
        return res.json({success:false,message:"No user"})
        
    }
  
}

export const updateProfilePicture = async (req:Request,res:Response) => {
    
 
    const imageLink = req.body;
    const id = req.signedCookies.id;

    try {

        //uploading the image with the public id options so when user updates his profile picture it replaces the old one and not add new resource in the cloud
        const uploadedResponse = await v2.uploader.upload(imageLink.image, {
        
        upload_preset: 'dev_setup',
        public_id:id
    });

        console.log(uploadedResponse);
        const imageLinkUpdated = uploadedResponse.url;
        const updatedUser = {
                image:imageLinkUpdated
            }
            const result = await User.findByIdAndUpdate(id, updatedUser, { new: true })
        return res.json({
            userDetails: {
                email: result.email,
                _id: result._id,
                image: result.image,
                userName: result.userName,
            } , message: "Picture updated", success: true }).status(201);
            
        
         
        
    
    } catch (error) {
        return res.json({ message: error, success: false });
    }

    

}


export const getMyprofile = async(req:Request,res:Response) => {

    const myEmail = req.params.email
    const result =  await User.findOne({ email: myEmail });
    return res.json(result);
}