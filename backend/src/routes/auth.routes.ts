import { Router } from "express";
import { signin, signup} from "../controllers/auth.controllers";
import auth from "../middleware/auth.middleware";


const authRouter: Router = Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);

export default authRouter;