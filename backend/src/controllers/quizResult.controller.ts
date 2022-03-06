import { Request, Response } from "express";

import Quiz from "../models/quizResult.model";
import User from "../models/user.model";
import mongoose from 'mongoose';
import { QuizResult } from "../dto";



export const addQuizResult = async (req: Request, res: Response) => {
    
    const userId: string = req.signedCookies.id;

    try {
        //checking if the id is valid mongoose object ID
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.json({message:"Invalid Id",success:false})
        const findExistingUser = await User.findById(userId);

        //find if the id exists in the database
        if (!findExistingUser) return res.json({ message: "User not registered", success: false })

        //create the quiz result object
        const quizResult = new Quiz({
        userId: userId,
        category: req.body.category,
        difficulty: req.body.difficulty,
        quiz: req.body.quiz
        });
        
        //saving the quiz result object to DB
        const result:QuizResult = await quizResult.save();
        if (result) return res.json({ result, message: "Quiz Result added", success: true });
        else return res.json({ message: "Quiz result adding Unsuccesful", success: true });

       
        
    } catch (error) {
        console.log(error)
    }
   

}


export const getUserQuizResults = async (req: Request, res: Response) => {

    const userId = req.signedCookies.id;
    try {
        const result: QuizResult[] = await Quiz.find({ userId: userId });
        console.log(result)
     return res.json({ result: result, success: true, message: "Successfully retrieved" }).status(200);
    } catch (error) {
        console.log(error)
    }
 
}