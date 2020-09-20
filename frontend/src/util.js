import React from "react";
import {Circle, Popup} from 'react-leaflet';
import numeral from 'numeral';

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 500,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
	return data.sort((a, b) => (a.cases.today > b.cases.today ? -1 : 1));
}

export const showDataOnMap = (data) =>
	data.map(country => (
		<Circle center={[country.location.lat, country.location.long]}
		color={casesTypeColors.cases.hex}
		fillOpacity={0.4}
		fillColor={casesTypeColors.cases.hex}
		radius={Math.sqrt(country.cases.total) * casesTypeColors.cases.multiplier}
		>
		<Popup>
		<div className="info-container">
			<div className="info-flag" style={{backgroundImage: `url(${country.flag})`}}></div>
			<div className="info-name">{country.country}</div>
			<div className="info-confirmed">Cases: {numeral(country.cases.total).format('0')}</div>
			<div className="info-recovered">Recovered: {numeral(country.recovered.total).format('0')}</div>
			<div className="info-deaths">Deaths: {numeral(country.deaths.total).format('0')}</div>
		</div>
		</Popup>
		</Circle>
	));

export const prettyPrintStat = (stat) =>
	stat ? `+${numeral(stat).format('0.0a')}` : '+0'