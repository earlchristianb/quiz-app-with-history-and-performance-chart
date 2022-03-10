/** @format */

import Image from "next/image";
import BlankBg from "../../public/BlankBg.png";
import StandingImg from "../../public/man-standing.png";
import React from "react";
import Nav from "./Nav";
import { useRouter } from "next/router";

const StartingPage = () => {
	const router = useRouter();

	const getStarted = (e: React.FormEvent) => {
		e.preventDefault();
		router.push("/login");
	};
	return (
		<section className='h-screen w-full flex flex-col mx-auto  justify-start items-center z-0'>
			<Image src={BlankBg} layout='fill' alt='Hero image' />
			<Nav />
			<div className='h-full w-5/6 z-10 flex justify-center items-center'>
				<div className='w-full h-5/6 relative hidden md:block'>
					<Image src={StandingImg} alt='Standing man' layout='fill' />
				</div>
				<div className='space-y-8 h-full w-full flex flex-col justify-center items-start'>
					<p className='text-2xl font-normal'>
						Confident on your Knowledge in different Categories?
					</p>
					<p className='text-2xl font-bold'>Take the Quiz now !</p>
					<button
						className='p-2 rounded-sm bg-teal-800 text-white'
						onClick={getStarted}>
						Get Started
					</button>
				</div>
			</div>
		</section>
	);
};

export default StartingPage;
