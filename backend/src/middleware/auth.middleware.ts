import { NextFunction , Request,Response} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import User from '../models/user.model';


const auth = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        if (req.headers.authorization) {
            const token: string | undefined = req.headers.authorization.split(" ")[1];
            
            if (token) {
                const isCustomAuth = token?.length < 500;
                if (token && isCustomAuth)
                {

                    
                    const payload : string| JwtPayload = jwt.verify(token,<string>process.env.JWT_SECRET);
                   
                    req.signedCookies = payload;
                    const existingUser = await User.findById(req.signedCookies.id);
                    if (existingUser) next();
                    else return res.json({ message: "Unauthorized" }).status(400);
                                     
                } 
                
            }
            
          
          
        }
        else {
            return res.json({message:"Unauthorized"}).status(400)
        }
    } catch (error) {
            console.log(error)
            return res.json({message:"Unauthorized"}).status(400)
        
    }
}

export default auth;