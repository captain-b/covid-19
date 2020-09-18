import React, {useState} from 'react';
import {MenuItem, Select, FormControl} from '@material-ui/core'
import './App.css';

function App() {
  const [countries, setCountries] = useState(['UK', 'USA']);
  return (
    <div className="app">
      <div className="app__header">

        <h1>Covid-19 tracker app.</h1>
        {/* Create a dropdown box */}
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