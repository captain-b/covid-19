import React, {useState, useEffect} from 'react';
import {MenuItem, Select, FormControl} from '@material-ui/core'
import './App.css';

function App() {

  const [countries, setCountries] = useState([{country: "Country"}]);

  useEffect(() =>  {

    const getCountrylist = async () => {
      try {
        const countryList = await (await fetch('/get_countries')).json();
        setCountries(countryList); // Set our countries object to our country list array.
      } catch (error) {
        alert('There was a problem fetching some data. please try again later.');
        console.log("there was an error", error);
      }
    }

    getCountrylist(); // Request the countries list from the backend.

  }, []);

  return (
    <div className="app">
      <div className="app__header">

        <h1>Covid-19 tracker app.</h1>
        {/* Create a dropdown box to display country names and codes*/}
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="worldwide">
          <MenuItem value="worldwide">WorldWide</MenuItem>
          {
            countries.map(country => (
              /* <MenuItem value={country.country}>{country.iso3}</MenuItem> */
              <MenuItem value={country.iso3}>{country.country} ({country.iso3})</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;