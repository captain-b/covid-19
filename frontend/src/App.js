import React, {useState, useEffect} from 'react';
import {MenuItem, Select, FormControl, Card, CardContent} from '@material-ui/core'
import './App.css';
import 'leaflet/dist/leaflet.css';
import InfoBox from './InfoBox';
import Map from './Map.js';
import Table from './Table';
import LineGraph from './LineGraph';
import {sortData, prettyPrintStat} from './util';

function App() {

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('worldwide');
  const [selectedCountryData, setSelectedCountryData] = useState({});
  const [mapCenter, setMapCenter] = useState({lat: 54.5260, lng: 15.2551});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries]= useState([]);
  const [casesType, setCasesType] = useState('cases');

  const backendURL = process.env.NODE_ENV === 'production' ? 'https://covid-tracker-captain-b.herokuapp.com' : process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    async function loadCountries() {
      try {
        const info = await (await fetch(`${backendURL}/get_countries/worldwide`)).json();
        setSelectedCountryData(info); // Set and display the selected country
      } catch (error) {
        handleError(error);
      }
    }
    loadCountries();
  },[]);

  function handleError(error) { // TODO: Rework this logic.
    alert('There was a problem fetching some data. please try again later.');
    console.log("there was an error", error);
  }

  useEffect(() =>  {
    const getCountrylist = async () => {
      try {
        const countryList = await (await fetch(`${backendURL}/get_countries`)).json();
        sortData(countryList);
        setCountries(countryList); // Set our countries object to our country list array.
        setMapCountries(countryList);
      } catch (error) {
        handleError(error);
      }
    }
    getCountrylist(); // Request the countries list from the backend.
  }, []);

  const countryChange = async (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode); // Set and display the selected country

    const endpoint = countryCode === 'worldwide' ? `${backendURL}/get_countries/worldwide` : `${backendURL}/get_countries/${countryCode}`;

    try {
      const info = await (await fetch(endpoint)).json();
      setSelectedCountryData(info); // Set and display the selected country

      setMapCenter([info.location.lat, info.location.long]);
      setMapZoom(5);
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className="app">
    <div className="app__left">
      <div className="app__header">

        <h1>Covid-19 tracker app.</h1>
        {/* Create a dropdown box to display country names and codes*/}
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={selectedCountry} onChange={countryChange}>
          <MenuItem value="worldwide">World Wide</MenuItem>
          {
            countries.map(country => (<MenuItem value={country.iso3}>{country.country} ({country.iso3})</MenuItem>))
          }
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox isPurple active={casesType === "cases"} onClick={e => setCasesType('cases')} title="Today's Cases:" cases={prettyPrintStat(selectedCountryData.today)} totalCases={prettyPrintStat(selectedCountryData.cases)} />
        <InfoBox isGreen active={casesType === "recovered"} onClick={e => setCasesType('recovered')} title="Recovered Today:" cases={prettyPrintStat(selectedCountryData.recoveredToday)} totalCases={prettyPrintStat(selectedCountryData.recovered)} />
        <InfoBox isRed active={casesType === "deaths"} onClick={e => setCasesType('deaths')} title="Deaths Today:" cases={prettyPrintStat(selectedCountryData.deathsToday)} totalCases={prettyPrintStat(selectedCountryData.deaths)} />
      </div>

      <Map cases={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />

    </div>
    <Card className="app__right">
      <CardContent>
        <h3>Live Cases Today</h3>
        <Table countries={countries} />
        <h3 className="app__graphTitle">Worlwide new {casesType}</h3>
        <LineGraph className="app__graph" cases={casesType} />
        {/* Graph */}
      </CardContent>
    </Card>
      
    </div>
  );
}

export default App;