import React, {useState, useEffect} from 'react';
import {MenuItem, Select, FormControl, Card, CardContent} from '@material-ui/core'
import './App.css';
import InfoBox from './InfoBox';
import Maps from './Maps';

function App() {

  const [countries, setCountries] = useState([{country: "Country"}]);
  const [selectedCountry, setSelectedCountry] = useState('worldwide');

  useEffect(() =>  {

    const getCountrylist = async () => {
      try {
        const countryList = await (await fetch('/get_countries')).json();
        setCountries(countryList); // Set our countries object to our country list array.
      } catch (error) { // TODO: Rework this logic.
        alert('There was a problem fetching some data. please try again later.');
        console.log("there was an error", error);
      }
    }

    getCountrylist(); // Request the countries list from the backend.

  }, []);

  const countryChange = async (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
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
        <InfoBox title="Coronavirus Cases" cases={123} totalCases={123} />
        <InfoBox title="Recovered Cases" cases={123} totalCases={123} />
        <InfoBox title="Deaths" cases={123} totalCases={123} />
      </div>

      <Maps />

    </div>
    <Card className="app__right">
      <CardContent>
        {/* Table */}
        {/* Graph */}
      </CardContent>
    </Card>
      
    </div>
  );
}

export default App;