import mongoose from "mongoose";

const items = new mongoose.Schema({
    question: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    options: {
        type: [String],
        required:true
    },
    userAnswer:{type:String,required:true}

});
const quizResultSchema = new mongoose.Schema({
    userId: {
        type: String,
        required:true
    },
    category: {
        type: String,
        required:true
    },
    difficulty: {
        type: String,
        required:true,
    },
    score: {
        type: Number,
        required: true
    },
    items: {
        type: [items],
        required: true
        
    }
    
   
}, {
    timestamps: true,

   
});

const Quiz = mongoose.model("QuizResult", quizResultSchema);
export default Quiz;