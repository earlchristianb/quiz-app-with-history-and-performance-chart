import { NextFunction , Request,Response} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from 'config'


const auth = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        if (req.headers.authorization) {
            const token: string | undefined = req.headers.authorization.split(" ")[1];
            
            if (token) {
                const isCustomAuth = token?.length < 500;
                if (token && isCustomAuth)
                {

                    
                    const payload : string| JwtPayload = jwt.verify(token, config.get("JWT_SECRET"));
                   
                    req.signedCookies = payload;
                    next();                 
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