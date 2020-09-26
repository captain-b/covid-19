import React, {useState} from 'react';
import './Map.css';
import {Map as LeafletMap, TileLayer} from 'react-leaflet';
import {showDataOnMap} from './util';

function Map({showAll, backgroundColor, countries, cases, center, zoom, ...props}) {
	return (
		<div style={{backgroundColor: backgroundColor}} className="map">
		{
			showAll ? (
				<div style={{backgroundColor: backgroundColor}} className="affected-countries-btn" onClick={props.showAllOnClick}>Show top 10 affected countries</div>
			) : (
				<div style={{backgroundColor: backgroundColor}} className="affected-countries-btn" onClick={props.showAllOnClick}>Show all affected countries</div>
			)
		}
			<LeafletMap center={center} zoom={zoom}>
				<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				{showDataOnMap(countries, cases)}
			</LeafletMap>
		</div>
	);
}

export default Map;