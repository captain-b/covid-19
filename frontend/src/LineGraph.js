import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';

const backendURL = process.env.NODE_ENV === 'production' ? 'https://covid-tracker-captain-b.herokuapp.com' : process.env.REACT_APP_BACKEND_URL;

const options = {
	legend: {
		display: false,
	},
	elements: {
		point: {
			radius: 0,
		},
	},
	maintainAspectRatio: false,
	tooltips: {
		mode: 'index',
		intersect: false,
		callback: {
			label: function (tooltipItem, data) {
				return numeral(tooltipItem.value).format('+0,0');
			}
		}
	},
	scales: {
		xAxes: [
			{
				type: 'time',
				time: {
					format: 'MM/DD/YY',
					tooltipFormat: 'll'
				}
			}
		],
		yAxes: [
			{
				gridLines: {
					display: false,
				},
				ticks: {
					callback: function (value, index, values) {
						return numeral(value).format('0a');
					}
				}
			}
		]
	}
}

const casesTypeColors = {
  cases: {
    hex: "#673ab7",
    rgb: "rgb(103, 58, 183)",
    half_op: "rgba(30, 59, 218, 0.5)",
    multiplier: 700,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 500,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 300,
  },
};

const chartData = (data, cases='cases') => {
	const chartData = [];
	let lastDataPoint;

	for (let date in data.cases) {
		if (lastDataPoint) {
			const newDataPoint = {
				x: date,
				y: data[cases][date] - lastDataPoint
			}
			chartData.push(newDataPoint);
		}
		lastDataPoint = data[cases][date];
	};
	return chartData;
}

function LineGraph({cases='cases', ...props}) {
	const [data, setData] = useState({});
	const [borderColor, setBorderColor] = useState('cases');
	const [backgroundColor, setBackgroundColor] = useState('cases');

	useEffect(() => {
		const historicalData = async () => {
			try {
				const historicData = await (await fetch(`${backendURL}/historic/all`)).json();
				const chart = chartData(historicData, cases);
				setData(chart);
				setBackgroundColor(casesTypeColors[cases].half_op)
				setBorderColor(casesTypeColors[cases].hex)
			} catch (error) {
				console.log(error);
			}
		}
		historicalData();
	}, [cases]);

	return (
		<div className={props.className}>
				{data?.length > 0 && (
					<Line options={options} data={{
						datasets: [{
							backgroundColor: backgroundColor,
							borderColor: borderColor,
							data: data
						}]
					}}>
						
					</Line>
				)}
		</div>
	)
}

export default LineGraph;