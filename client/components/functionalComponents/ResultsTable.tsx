/** @format */

import React, { ButtonHTMLAttributes, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { RootStateOrAny, useSelector } from "react-redux";
import styles from "../../styles/Home.module.css";
import {useRouter} from "next/router";

const ResultsTable = () => {
	const router = useRouter();
	const { recentQuizzes } = useSelector((state: RootStateOrAny) => state.quiz);
	const [quizCollectionSlice, setQuizCollectionSlice] = useState(
		recentQuizzes.slice()
	);
	const [pageNumber, setPageNumber] = useState<number>(0);
	const quizPerPage = 5;
	const pagesVisited = pageNumber * quizPerPage;
	const pageCount = Math.ceil(quizCollectionSlice.length / quizPerPage);
	console.log(pageCount);
	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};
	

	const displayQuiz = quizCollectionSlice
		.slice(pagesVisited, pagesVisited + quizPerPage)
		.map((quiz, i) => (
			<tr key={i}>
				<td className='px-6 py-4 whitespace-nowrap'>
					<div className='flex items-center'>
						<div className='ml-4'>
							<div className='text-sm font-medium text-gray-900'>
								{quiz.category}
							</div>
						</div>
					</div>
				</td>
				<td className='px-6 py-4 whitespace-nowrap'>
					<div className='text-sm text-gray-900'>{quiz.difficulty}</div>
				</td>
				<td className='px-6 py-4 whitespace-nowrap'>
					<span
						className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
							quiz.score > 5 ? "bg-green-200" : "bg-red-200"
						} text-green-800`}>
						{quiz.score}
					</span>
				</td>
				<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
					{quiz.createdAt.substring(0, 10)}
				</td>
				{/* <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
					<button onClick={() => {
						// router.push(`/quizresult/${quiz._id}`);
					}} className='text-indigo-600 hover:text-indigo-900'>
						View
					</button>
				</td> */}
			</tr>
		));

	useEffect(() => {});

	return (
		<div className=''>
			<div className='flex flex-col z-10'>
				<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
						<div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
							<table className='min-w-full divide-y divide-gray-200  '>
								<thead className='bg-sky-200'>
									<tr>
										<th
											scope='col'
											className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Category
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Difficulty
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Score
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-left flex text-xs font-medium text-gray-500 uppercase tracking-wider'>
											<p>Date</p><p className="text-slate-400">(YYYY-MM-DD)</p>
											
										</th>
										{/* <th scope='col' className='relative px-6 py-3'>
											<span className='sr-only'>Edit</span>
										</th> */}
									</tr>
								</thead>
								<tbody className='bg-white divide-y divide-gray-200'>
									{recentQuizzes ? displayQuiz : ""}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div className='flex justify-center items-center w-full m-auto mt-8'>
				<ReactPaginate
					previousLabel={"Previous"}
					nextLabel={"Next"}
					pageCount={pageCount}
					onPageChange={changePage}
					containerClassName={styles.container}
					previousLinkClassName={``}
				/>
			</div>
		</div>
	);
};

export default ResultsTable;
