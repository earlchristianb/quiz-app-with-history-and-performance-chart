import { NextPage } from "next";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import QuizSelection from "../../components/functionalComponents/QuizSelection";
import UserCard from "../../components/functionalComponents/UserCard";
import { authActions } from "../../components/store/auth-slice";
import BlankBg from '../../public/BlankBg.png'
const Main: NextPage = () => {
    

    const router=useRouter()
    
    const user=useSelector((state:RootStateOrAny)=>state.auth.user)
    useEffect(() => {
        if(!user) router.push('/login')
    })
    return (
        <section className="h-screen w-full flex flex-col mx-auto  justify-center items-center z-0 m-auto">
            
            <Image src={BlankBg} layout="fill" alt="Hero image" />
            <div className="h-5/6 w-5/6 md:max-w-md flex flex-col justify-center items-center bg-sky-300 z-10  shadow-2xl rounded-sm">
             <UserCard />
                <QuizSelection />
            </div>
           
        </section>
    )
 
};

export default Main;
