import { NextPage } from "next";
import Image from 'next/image'
import React, { useEffect } from "react";
import BlankBg from '../../public/BlankBg.png';
import { useState } from "react";
import { RootStateOrAny, useSelector,useDispatch } from "react-redux";
import { authActions, logInCredentials, signUpCredentials, userLogin, userSignUp } from "../../components/store/auth-slice";
import { useRouter } from "next/router";

const Login: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    //true= signup page
    //false=login page
    const isSignup = useSelector((state: RootStateOrAny) => state.auth.isSignup);
    const user = useSelector((state: RootStateOrAny) => state.auth.user);
    const message = useSelector((state: RootStateOrAny) => state.auth.message);
    const [hidden, setHidden] = useState<boolean>(true);


    useEffect(() => {
        if (user) router.push('/main');
    }, [user]);

    type  formDatatype={
        email: string,
        userName: string,
        password:string
            
    }
    const [formData, setFormData] = useState<formDatatype>({
        email: "",
        userName: "",
        password:""
    });
    const toggleState = (e: React. FormEvent) => {
        e.preventDefault();
        dispatch(authActions.signInPage());
        setFormData({
            email: "",
            password: "",
            userName: "",
        });
    }
    
    const handleSubmit =(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSignup) {
            const details: signUpCredentials = {
                email: formData.email,
                password:formData.password,
                userName:formData.userName,
            }
            dispatch(userSignUp(details));
            setHidden(false)
            setTimeout(() => {
                setHidden(true)
            },5000)
        }

        if (!isSignup) {
            console.log(isSignup)
            const details = {
                email: formData.email,
                password: formData.password,
            }
            dispatch(userLogin(details));
             setHidden(false)
            setTimeout(() => {
                setHidden(true)
            },5000)
        }
        }
           


    return (
    <section className="h-screen w-full flex flex-col mx-auto  justify-center items-center z-0 m-auto">
      <Image src={BlankBg} layout="fill" alt="Hero image" />
      <div className="h-5/6 w-5/6 md:max-w-md flex justify-center items-center z-10 bg-sky-300 shadow-2xl rounded-sm">
                <form className='flex flex-col items center justify-center space-y-5 p-3 w-4/6' onSubmit={handleSubmit}>
                    <p className="font-bold text-2xl text-left">{isSignup? "Create an Account" : `Log in to your account`}</p>
                   
                    <input value={formData.email}  type='text' id="email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData({...formData,email:e.target.value})
                    }} className="p-1 rounded-sm placeholder-neutral-500" placeholder="Email"></input>
                 
                    <input value={formData.userName} type='text' id="userName" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData({...formData,userName:e.target.value})
                    }} className={`p-1 rounded-sm placeholder-neutral-500 ${isSignup?"block":"hidden"}`}  placeholder="Username"></input>
                   
                    <input value={formData.password} type='password' id="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData({...formData,password:e.target.value})
                    }} className="p-1 rounded-sm placeholder-neutral-500" placeholder="Password"></input>
                    <p className={`${hidden?"hidden":"block"}`}>{message}</p>
                
                    <button type="submit" className="bg-white p-2 w-4/6 h-auto self-center rounded-md  text-center font-semibold">{isSignup===true?"Sign up":"Log in"}</button>
                    
                    <button onClick={toggleState} className="font-medium text-primaryDark">{isSignup?"Already have an account?":" New here ? Create an Account"}</button>
                </form>
        </div>
    </section>
 );
};

export default Login;
