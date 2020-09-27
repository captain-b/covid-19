import React, { useState, useEffect } from "react";
import {Circle, Popup} from 'react-leaflet';
import numeral from 'numeral';

const casesTypeColors = {
  cases: {
    hex: "#673ab7",
    rgb: "rgb(103, 58, 183)",
    half_op: "rgba(30, 59, 218, 0.5)",
    custom_op: "rgba(30, 59, 218, 0.1)",
    multiplier: 700,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    custom_op: "rgba(125, 215, 29, 0.1)",
    multiplier: 500,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    custom_op: "rgba(251, 68, 67, 0.1)",
    multiplier: 300,
  },
};

export const sortData = (data) => {
	return data.sort((a, b) => (a.cases.today > b.cases.today ? -1 : 1));
}

export const showDataOnMap = (data, caseType) => {
	return data.map(country => (
		<Circle center={[country.location.lat, country.location.long]}
		color={casesTypeColors[caseType].hex}
		fillOpacity={0.4}
		fillColor={casesTypeColors[caseType].hex}
		radius={Math.sqrt(country.cases.total) * casesTypeColors[caseType].multiplier}
		>
		<Popup>
		<div className="info-container">
			<div className="info-flag" style={{backgroundImage: `url(${country.flag})`}}></div>
			<div className="info-name">{country.country}</div>
			<div className="info-confirmed">Cases: {numeral(country.cases.total).format('0,0')}</div>
			<div className="info-recovered">Recovered: {numeral(country.recovered.total).format('0,0')}</div>
			<div className="info-deaths">Deaths: {numeral(country.deaths.total).format('0,0')}</div>
		</div>
		</Popup>
		</Circle>
	));
}

export const prettyPrintStat = (stat) =>
	stat ? `+${numeral(stat).format('0.0a')}` : '+0'


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}