import { Router } from "express";
import { addQuizResult, getSpecificQuizResult, getUserQuizResults } from "../controllers/quizResult.controller";
import auth from "../middleware/auth.middleware";

const quizRouter: Router = Router();

quizRouter.post('/', auth, addQuizResult);
quizRouter.get('/', auth, getUserQuizResults);
quizRouter.get('/:id', auth, getSpecificQuizResult);


export default quizRouter