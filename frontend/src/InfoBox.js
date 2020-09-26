import React from 'react';
import {
	CircularProgress, Card,
	CardContent, Typography
} from '@material-ui/core';
import './InfoBox.css';

function InfoBox({isLoading, backgroundColor, title, cases, totalCases, isPurple, isRed, isGreen, active, ...props}) {
	return (
		<Card style={{backgroundColor: backgroundColor}} onClick={props.onClick} className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'} ${isPurple && 'infoBox--purple'}`}>
			<CardContent>
				<Typography className="infoBox__title" color="textSecondary">
					{title}
				</Typography>
				{
					isLoading ? (<CircularProgress />) : (
						<h2 className={`infoBox__cases ${isGreen && 'infoBox__cases--green'} ${isPurple && 'infoBox__cases--purple'}`}>{cases}</h2>
					)
				}
				<Typography className="infoBox__total" color="textSecondary">
					Total: {totalCases}
				</Typography>
			
			</CardContent>
		</Card>
	)
}

export default InfoBox;