import { Router } from "express";
import { getMyprofile, updateProfilePicture, updateUserName } from "../controllers/user.controller";
import auth from "../middleware/auth.middleware";


const userRouter: Router = Router();


userRouter.patch('/update', auth, updateUserName);
userRouter.patch('/image', auth, updateProfilePicture);
userRouter.get('/me/:email',getMyprofile)
export default userRouter;