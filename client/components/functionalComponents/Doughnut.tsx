

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type doughtnutProps = {
    categories: string[]|null,
    frequency:number[]|null
}
 
export const DoughnutChart: FC<doughtnutProps> = ({ categories, frequency }) => {


    const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Favorite Category(Number of Quiz taken per Category)",
			},
		},
	};
  const data = {
  labels: categories,
  datasets: [
    {
      label: '# of Votes',
      data: frequency,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

    return (
       
            
            <Doughnut data={data} options={options} />
    
        
    );
}

