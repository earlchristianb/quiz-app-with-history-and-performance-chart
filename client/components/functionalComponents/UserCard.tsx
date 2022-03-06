import Image from "next/image"
import React, { ButtonHTMLAttributes, FC, useEffect } from "react"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import defaultImage from '../../public/defaultImage.png'
import { authActions } from "../store/auth-slice"
import {useRouter} from 'next/router';
const UserCard: FC =  React.memo(()=> {


  const dispatch = useDispatch();
  const {user} =useSelector((state:RootStateOrAny)=>state.auth)
  const router = useRouter();
  
  useEffect(()=>{
  dispatch(authActions.getUserFromSession());
  },[])
  
  const viewHistory = (e:React.FormEvent) => {
    e.preventDefault();
  }
  return (
    <div className="flex justify-around items-center space-x-2 z-20 bg-textLight w-60 md:w-80  rounded-sm p-4 shadow-2xl mx-auto " >
      <div className="h-24 w-24 rounded-full relative shadow-md p-1 border-4 border-white">
         <Image src={user?.image?user.image:defaultImage} layout="fill" alt="user image" className="rounded-full shadow-md"/>
      </div>
      <div className="text-textLight font-medium text-xl flex flex-col justify-center space-y-3 items-start">
        <div>{user?.userName}</div>
        <button className="text-sm bg-white text-slate-700 hover:shadow-secondaryDark shadow-sm shadow-slate-400 p-2 rounded-sm hover:cursor-pointer font-medium "
        onClick={viewHistory}
        >View History</button>
      </div>
      
    </div>
  )
})

export default UserCard