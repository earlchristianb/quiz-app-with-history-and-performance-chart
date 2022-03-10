/** @format */

import Image from "next/image";
import React, { ButtonHTMLAttributes, FC, useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import defaultImage from "../../public/defaultImage.png";
import { authActions } from "../store/auth-slice";
import { useRouter } from "next/router";


const UserCardComponent: FC = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootStateOrAny) => state.auth);
	const router = useRouter();

	useEffect(() => {
		dispatch(authActions.getUserFromSession());
	}, []);

	const viewProfile = (e: React.FormEvent) => {
		e.preventDefault();
		router.push("/profile");
	};

	return (
		<div className='flex justify-around items-center space-x-2 z-20 bg-slate-200 w-60 md:w-80  rounded-sm p-4 shadow-2xl mx-auto '>
			<div className='h-24 w-24 rounded-full relative shadow-md p-1 border-4 border-white'>
				<Image
					src={user?.image ? user.image : "https://i.stack.imgur.com/l60Hf.png"}
					layout='fill'
					alt='user image'
					className='rounded-full shadow-md'
				/>
			</div>
			<div className='text-textLight font-medium text-xl flex flex-col justify-center space-y-3 items-start'>
				<div className='text-black'>{user?.userName}</div>
				<button
					className='text-sm bg-white text-slate-700 hover:shadow-secondaryDark shadow-sm shadow-slate-400 p-2 rounded-sm hover:cursor-pointer font-medium '
					onClick={viewProfile}>
					View Profile
				</button>
			</div>
		</div>
	);
};

const UserCard=React.memo(UserCardComponent) 

export default UserCard ;
