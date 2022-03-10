/** @format */

import { FC, useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

type propsLineChart = {
	label: string[],
	score: number[],
	
}

export const LineChart: FC<propsLineChart> = ({label,score}) => {
	let data;

    
    data = {
				labels:label,
				datasets: [
					{
						label: "Quiz Scores",
						data: score,
						borderColor: "rgb(255, 99, 132)",
						backgroundColor: "rgba(255, 99, 132, 0.5)",
					},
				],
			};
	// useEffect(() => {
		

	// 	async function getScores() {
	// 		{
	// 			/*Mapping thorugh and getting the score*/
	// 		}
	// 		{
	// 			/*Assigning it to dataObject for the Line chart*/
	// 		}

	// 		scores = await recentQuizzes.map((item) => {
	// 			return item.score;
	// 		});

			
	// 	}

	// 	// async function getLabels(){
	// 	//    difficulty = await recentQuizzes.map((item) => {
	// 	// 		return item.difficulty;
	// 	//      });
	// 	// }

	// 	// getLabels();
	// 	getScores();
	// }, [recentQuizzes]);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Performace chart(Scores)",
			},
		},
	};

	return (
		<div className="w-full p-4">
			<Line data={data} options={options} />
		</div>
	);
};

export default LineChart;
