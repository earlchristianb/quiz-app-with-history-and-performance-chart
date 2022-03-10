

export interface GetQuiz {
    response_code?: number;
    results:       Questions[];
}

export interface Questions {
    category:          string;
    type:              string;
    difficulty:        string;
    question:          string;
    correct_answer:    string;
    incorrect_answers: string[];
}

export type AllQuizResult = {
    recentQuizzes:QuizResult[]|[],
}
export type QuizResult={
    category: string|null,
    difficulty: string|null,
    quiz: Answered[]|[],
    userId?: string | null,
    createdAt?:Date
}

export type Answered={
    question: string,
    correctAnswer: string,
    userAnswer:string,
    
}