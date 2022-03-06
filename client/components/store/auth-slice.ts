import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import { RootStateOrAny, useSelector } from "react-redux";
import API from "../api/axios";


export type logInCredentials = {
    email: string,
    password:string
}

export type signUpCredentials = {
    email: string,
    password: string,
    userName:string,
}

// export const userSignUp = createAsyncThunk('auth/userSignUp',
//     async (details: signUpCredentials, dispatch) => {
//         const { data } = await axios.post('http://localhost:5000/auth/signin', details);
//         return data;
// }) 
    


export const userSignUp = createAsyncThunk('auth/userSignUp', async (details: signUpCredentials, dispatch) => {
    

        const { data } = await API.post('/auth/signup', details)
        return data;
   
        
    }
)

export const userLogin = createAsyncThunk('auth/userLogin', async (details: logInCredentials, dispatch) => {
    

        const { data } = await API.post('/auth/signin', details)
        return data;
   
        
    }
)

type authState={
    isLoggedIn: boolean,
    isSignup: boolean,
    user: null | object,
    status: string | null,
    token: string | null,
    message: string | null,
    requestStatus: boolean | null,
    
}

const initialState:authState={
    isLoggedIn:false,
    isSignup: true,
    user: null,
    status: null,
    token: null,
    message: null,
    requestStatus:null
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login:(state)=> {
            state.isLoggedIn = true;
        },
         logout:(state)=> {
            state.isLoggedIn = false;
        },
        signInPage:(state)=> {
            state.isSignup = !state.isSignup;
        },
        getUserFromSession: (state) => {
            state.user = JSON.parse(sessionStorage?.getItem('user'));
             state.token = JSON.parse(sessionStorage?.getItem('token'));
        }
      
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state: RootStateOrAny, action) => {
             state.status='loading'
         }),
        builder.addCase(userLogin.fulfilled, (state:RootStateOrAny, action) => {
            state.user = action.payload.userDetails
            state.token = action.payload.token
            state.message = action.payload.message
          sessionStorage.setItem("token", JSON.stringify(action.payload.token));
            sessionStorage.setItem("user", JSON.stringify(action.payload.userDetails));
            state.status = 'Success'
            state.requestStatus=action.payload.success
           
        }),
        builder.addCase(userLogin.rejected, (state: RootStateOrAny, action) => {
             state.status='rejected'
        }),
        builder.addCase(userSignUp.pending, (state: RootStateOrAny, action) => {
             state.status='loading'
         }),
        builder.addCase(userSignUp.fulfilled, (state:RootStateOrAny, action) => {
            state.user = action.payload.userDetails
            
            state.token = action.payload.token
            sessionStorage.setItem("token", JSON.stringify(action.payload.token));
            sessionStorage.setItem("user", JSON.stringify(action.payload.userDetails));
            state.message=action.payload.message
            state.status = 'Success'
            state.requestStatus=action.payload.success
           
        }),
        builder.addCase(userSignUp.rejected, (state: RootStateOrAny, action) => {
             state.status='rejected'
        })
        }
        
   
})


export const authActions = authSlice.actions;

export default authSlice;