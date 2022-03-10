/** @format */

import { NextPage } from "next";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import QuizSelection from "../../components/functionalComponents/QuizSelection";
import UserCard from "../../components/functionalComponents/UserCard";
import { authActions } from "../../components/store/auth-slice";
import { getQuizCollection } from "../../components/store/quizResults-slice";
import BlankBg from "../../public/BlankBg.png";

const Main: NextPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const user = useSelector((state: RootStateOrAny) => state.auth.user);
	useEffect(() => {
		if (!user) router.push("/login");
	});
	useEffect(() => {
		if (user) dispatch(getQuizCollection());
	}, [user]);

	const handleLogout = () => {
		dispatch(authActions.logout());
	};
	return (
		<section className='h-screen w-full flex flex-col mx-auto  justify-center items-center z-0 m-auto '>
			<div className='h-5/6 w-5/6 md:max-w-md flex flex-col justify-center items-center bg-sky-300 z-10  shadow-2xl rounded-sm relative'>
				<UserCard />
				<QuizSelection />
				<div
					onClick={handleLogout}
					className='absolute cursor-pointer bottom-1 right-1 z-20 flex bg-white rounded-sm p-1 justify-center items-center'>
					<p className='hidden md:block'>Logout</p>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-4 w-4 '
						fill='white'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth={2}>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
						/>
					</svg>
				</div>
			</div>
		</section>
	);
};

export default Main;
