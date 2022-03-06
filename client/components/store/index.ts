import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import userQuizResultSlice from "./quizResults-slice";
import selectSlice from "./selection-slice";

export default configureStore({
    reducer: {
        auth: authSlice.reducer,
        quiz: userQuizResultSlice.reducer,
        select:selectSlice.reducer
    }
});
