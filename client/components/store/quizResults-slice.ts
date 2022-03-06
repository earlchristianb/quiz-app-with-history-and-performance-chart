import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import { newQuizResult } from "../../pages/quiz";
import API from "../api/axios";
import { AllQuizResult, QuizResult } from "../types/quiz";


type QuizCollection = {
    recentQuizzes: QuizResult[] | [],
    requestStatus: boolean|null,
    message:string|null,
}

const initialState: QuizCollection = {
    recentQuizzes: [],
    requestStatus: null,
    message:null 
}



export const addQuizResult = createAsyncThunk('quiz/addquizresult', async (quizResult:newQuizResult , dispatch) => {
    

        const { data } = await API.post('/quiz', quizResult)
        return data;
   
        
    }
)

const userQuizResultSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setQuizResults: (state,action) => {
            state.recentQuizzes=action.payload
        }
    },
    extraReducers:(builder)=> {
        builder.addCase(addQuizResult.pending, (state: RootStateOrAny, action) => {
             state.status='loading'
         }),
        builder.addCase(addQuizResult.fulfilled, (state:RootStateOrAny,action) => {
            state.user = action.payload.userDetails
            state.token = action.payload.token
            state.message = action.payload.message
            state.status = 'Success'
            state.requestStatus=action.payload.success
           
        }),
        builder.addCase(addQuizResult.rejected, (state: RootStateOrAny, action) => {
             state.status='rejected'
        })
    }
})



export const userQuizResultActions = userQuizResultSlice.actions;

export default userQuizResultSlice