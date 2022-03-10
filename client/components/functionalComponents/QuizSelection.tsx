/** @format */

import React, {
	FC,
	FormEvent,
	FormEventHandler,
	useState,
	useRef,
} from "react";
import Leaderboard from "./Leaderboard";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { selectActions } from "../store/selection-slice";
import ReactSelect from "react-select";
//mythology=20
//Sports=21
//Geography=22
//History=23
//Politics=24
//Sciende:Computers=18

const categoryOptions = [
	{ value: "18", label: "Computers" },
	{ value: "20", label: "Mythology" },
	{ value: "21", label: "Sports" },
	{ value: "22", label: "Geography" },
	{ value: "23", label: "History" },
	{ value: "24", label: "Politics" },
];

const difficultyOptions = [
	{ value: "easy", label: "Easy" },
	{ value: "medium", label: "Medium" },
	{ value: "hard", label: "Hard" },
];
const QuizSelection: FC = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	type Categorytype = {
		label: string;
		value: string;
	};
	const [category1, setCategory] = useState<Categorytype | undefined>();
	const [difficulty1, setDifficulty] = useState<Categorytype | undefined>();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(
			selectActions.setSelection({
				difficulty: difficulty1.value,
				category: category1.label,
				categoryCode: category1.value,
			})
		);

		setTimeout(() => {
			router.push("/quiz");
		}, 1000);
	};
	return (
		<form
			className='w-60 md:w-80 p-8 h-60 md:h-72 space-y-2 md:space-y-3 bg-slate-200 drop-shadow-md shadow-2xl relative'
			onSubmit={handleSubmit}>
			<div>
				<label htmlFor='category' className='font-medium'>
					Category
				</label>
				<ReactSelect options={categoryOptions} onChange={setCategory} />
			</div>
			<div>
				<label htmlFor='difficulty' className='font-medium'>
					Difficulty Level
				</label>
				<ReactSelect options={difficultyOptions} onChange={setDifficulty} />
			</div>

			<div className='flex justify-center items-center'>
				<button
					disabled={
						category1 === undefined && difficulty1 === undefined ? true : false
					}
					type='submit'
					className={`${
						category1 === undefined || difficulty1 === undefined
							? "bg-textLight"
							: "bg-sky-400"
					} text-slate-700 font-bold rounded-lg p-2 mt-1 w-3/4 shadow-md shadow-primaryLight`}>
					Generate Quiz
				</button>
			</div>

			{/* <Leaderboard/> */}
		</form>
	);
};

export default QuizSelection;
