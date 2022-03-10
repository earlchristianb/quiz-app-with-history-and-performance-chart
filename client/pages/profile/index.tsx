/** @format */

import { NextPage } from "next";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import ResultsTable from "../../components/functionalComponents/ResultsTable";
import Image from "next/image";
import BlankBg from "../../public/BlankBg.png";
import React, { useEffect, useRef, useState } from "react";
import { authActions, updatePicture } from "../../components/store/auth-slice";
import { useRouter } from "next/router";
import { LineChart } from "../../components/functionalComponents/LineChart";
import {DoughnutChart} from "../../components/functionalComponents/Doughnut";

const ProfilePage: NextPage = () => {
	const { recentQuizzes } = useSelector((state: RootStateOrAny) => state.quiz);
	const { user } = useSelector((state: RootStateOrAny) => state.auth);
	const [selectedFile, setSelectedFile] = useState<ArrayBuffer | string>();
	const dispatch = useDispatch();
	const router = useRouter();
	const [scoreArray, setScoreArray] = useState<number[] | null>()
	const [labelArray,setLabelArray]=useState<string[]|null>()
	const [categories, setCategories] = useState<string[] | null>(['Computers', 'Mythology', 'Sports', 'Geography', 'History', 'Politics']);
	const [categoryFrequency, setCategoryFrequency] = useState<number[]|null>();
	
		useEffect(() => {
			const getData =  recentQuizzes.map((item, i) => {
				return {
					label: String(i + 1),
					score:item.score,
				}
				
			})
			const scores = getData.map(item => {
				return item.score
			});
			const label = getData.map(item => item.label);
			let computer :number= 0;
			let mythology: number = 0;
			let sports :number= 0;
			let geography: number = 0;
			let history :number= 0;
			let politics: number = 0;
			//Getting the data for the doughnut chart(Category favorite)
			const frequencyCategory = recentQuizzes?.map((item) => {
				switch (item.category) {
					case 'Computers':
						computer++
					
						break;
					case 'Mythology':
						mythology++
					
						break;
					case 'Sports':
						sports++
					
						break;
					case 'Geography':
						geography++
					
						break;
					case 'History':
						history++
					
						break;
					case 'Politics':
						politics++
					
						break;
					default:
						break;
				}
			})
			
			setCategoryFrequency([computer, mythology, sports, geography, history, politics]);
			
			setScoreArray(scores);
			setLabelArray(label);
			
	}, [user]);

	const openFileSelector = () => {
		const fileSelectElement = document.getElementById("fileSelector");
		fileSelectElement.click();
	};

	const handleFileSelected = (e: React.FormEvent<HTMLInputElement>) => {
		const file = e.currentTarget.files[0];
		previewFile(file);
	};

	const previewFile = (file: File) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setSelectedFile(reader.result);
		};
		console.log(reader.result);
	};

	const handleCancel = () => {
		setSelectedFile("");
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (selectedFile) {
			const image = {
				image: selectedFile.toString(),
			};
			// dispatch(updatePicture(selectedFile));
			dispatch(updatePicture(image));
		}
		setSelectedFile("");
	};
	const handleBack = () => {
		router.back();
	};

	console.log(categoryFrequency);
	return (
		<div className=' w-full flex flex-col  justify-center items-start m-auto p-5 relative    '>
			{/* <Image src={BlankBg} layout="fill" alt="bg"/> */}

			<div className='z-10 w-full m-auto flex flex-col md:space-y-2   p-2'>
				<div className='space-y-2 flex flex-col md:flex-row justify-center md:justify-start md:space-x-8 items-center bg-sky-200 relative  p-6 rounded-lg'>
					{/*USERINFO*/}

					{/*Close Button*/}
					<div
						onClick={handleBack}
						className='absolute top-1 right-1 cursor-pointer'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5 z-20 '
							viewBox='0 0 20 20'
							fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
								clipRule='evenodd'
							/>
						</svg>
					</div>

					<div className='relative w-40 h-40 rounded-full md:rounded-sm shadow-sm'>
						{/*CHANGE PROFILE PICTURE*/}
						<svg
							xmlns='http://www.w3.org/2000/svg'
							onClick={openFileSelector}
							className='h-10 w-10 absolute bottom-0 right-0 z-20 cursor-pointer'
							fill='white'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
							/>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
							/>
						</svg>
						<input
							id='fileSelector'
							hidden={true}
							type='file'
							accept='image/*'
							onChange={handleFileSelected}></input>
						{/*PROFILE PICTURE*/}
						{user?.image ? (
							<Image
								src={selectedFile ? selectedFile : user?.image}
								alt='user image'
								layout='fill'
								className='
                        rounded-full md:rounded-sm shadow-sm '
							/>
						) : (
							<Image
								src={selectedFile ? selectedFile.toString() : "https://i.stack.imgur.com/l60Hf.png"}
								alt='user image'
								layout='fill'
								className='
                            rounded-full md:rounded-sm shadow-sm '
							/>
						)}
					</div>
					{/*USER DETAILS*/}
					<div
						className={`${
							selectedFile ? "block" : "hidden"
						} flex md:flex-col space-x-2 md:space-x-0  md:space-y-2`}>
						<button
							onClick={handleSubmit}
							className='bg-white p-2 rounded-md border border-slate-400'>
							Update
						</button>
						<button
							onClick={handleCancel}
							className='bg-red-200 p-2 rounded-md border border-slate-400'>
							Cancel
						</button>
					</div>
					<div className=' md:text-left font-medium text-lg z-10  '>
						<p className='text-lg font-normal text-slate-700 text-left '>
							Username:
						</p>
						<p className='bg-white rounded-lg shadow-lg p-2'>{user.userName}</p>
						<p className='text-lg font-normal text-slate-700 text-left '>
							Email:
						</p>
						<p className='italic font-normal text-blue-600 bg-white rounded-lg shadow-lg p-2 '>
							{user.email}
						</p>
					</div>
				</div>

				{/*QUIZ COLLECTION TABLE*/}
				<div className='text-left text-2xl space-y-3 overflow-clip relative'>
					<p className=''>Recent Quizzes</p>
					{recentQuizzes ? <ResultsTable /> : ""}
				</div>

				{/* CHARTS  */}
				<div className='grid grid-cols-1 mt-5 md:grid-cols-2  gap-3 '>
					<div className="">
							<LineChart label={labelArray} score={scoreArray} />
					</div>
						
					
					<div className="p-9">
						<DoughnutChart categories={categories} frequency={categoryFrequency}/>
					</div>
						
					
					
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
