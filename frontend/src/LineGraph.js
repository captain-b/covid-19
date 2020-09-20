import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';

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

function LineGraph({cases='cases'}) {
	const [data, setData] = useState({});

	useEffect(() => {
		const historicalData = async () => {
			try {
				const historicData = await (await fetch('historic/all')).json();
				const chart = chartData(historicData);
				setData(chart);
			} catch (error) {
				console.log(error);
			}
		}
		historicalData();
	}, [cases]);

	return (
		<div className="line_graph">
				<h1>Worldwide new cases</h1>
				{data?.length > 0 && (
					<Line options={options} data={{
						datasets: [{
							data: data
						}]
					}}>
						
					</Line>
				)}
		</div>
	)
}

export default LineGraph;