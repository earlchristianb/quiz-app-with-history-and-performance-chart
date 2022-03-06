
export type QuizItems = {
    question: string,
    correctAnswer: string,
    userAnswer:string
}

export type QuizResult = {
    userId: string,
    category: string,
    type: string,
    score: number,
    quiz: QuizItems[]
    _id: string,
    createdAt: Date,
    updatedAt: Date,
    __v:number
}