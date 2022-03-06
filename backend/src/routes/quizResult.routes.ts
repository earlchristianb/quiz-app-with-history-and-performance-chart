import { Router } from "express";
import { addQuizResult, getUserQuizResults } from "../controllers/quizResult.controller";
import auth from "../middleware/auth.middleware";

const quizRouter: Router = Router();

quizRouter.post('/', auth, addQuizResult);
quizRouter.get('/', auth, getUserQuizResults);


export default quizRouter