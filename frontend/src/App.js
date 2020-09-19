import React, {useState, useEffect} from 'react';
import {MenuItem, Select, FormControl} from '@material-ui/core'
import './App.css';

function App() {

  const [countries, setCountries] = useState([]);

  useEffect(() =>  {

    const getCountrylist = async () => {
      await fetch('/get_countries').then(function(response) {
        console.log(response);
      }, function(error) {
        console.log(error);
      });
    }

    getCountrylist(); // Request the countries list from the backend.

  }, [countries]);

  return (
    <div className="app">
      <div className="app__header">

        <h1>Covid-19 tracker app.</h1>
        {/* Create a dropdown box to display country names and codes*/}
        <FormControl className="app__dropdown">

          <Select variant="outlined" value="abc">
          {
            countries.map(country => (
              <MenuItem value={country}>{country}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;