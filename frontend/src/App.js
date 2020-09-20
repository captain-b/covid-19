import React, {useState, useEffect} from 'react';
import {MenuItem, Select, FormControl, Card, CardContent} from '@material-ui/core'
import './App.css';
import InfoBox from './InfoBox';
import Maps from './Maps';
import Table from './Table';
import {sortData} from './util'

function App() {

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('worldwide');
  const [selectedCountryData, setSelectedCountryData] = useState({});

  useEffect(() => {
    async function loadCountries() {
      try {
        const info = await (await fetch('/get_countries/worldwide')).json();
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
        const countryList = await (await fetch('/get_countries')).json();
        sortData(countryList);
        setCountries(countryList); // Set our countries object to our country list array.
      } catch (error) {
        handleError(error);
      }
    }
    getCountrylist(); // Request the countries list from the backend.
  }, []);

  const countryChange = async (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode); // Set and display the selected country

    const endpoint = countryCode === 'worldwide' ? '/get_countries/worldwide' : `/get_countries/${countryCode}`;

    try {
      const info = await (await fetch(endpoint)).json();
      setSelectedCountryData(info); // Set and display the selected country
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
        <InfoBox title="Coronavirus Cases:" cases={selectedCountryData.today} totalCases={selectedCountryData.cases} />
        <InfoBox title="Recovered Cases:" cases={selectedCountryData.recoveredToday} totalCases={selectedCountryData.recovered} />
        <InfoBox title="Deaths:" cases={selectedCountryData.deathsToday} totalCases={selectedCountryData.deaths} />
      </div>

      <Maps />

    </div>
    <Card className="app__right">
      <CardContent>
        <h3>Live Cases by Country</h3>
        <Table countries={countries} />
        {/* Graph */}
      </CardContent>
    </Card>
      
    </div>
  );
}

export default App;