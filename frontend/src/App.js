import React, {useState, useEffect} from 'react';
import {MenuItem, Select, FormControl, Card, CardContent} from '@material-ui/core'
import './App.css';
import 'leaflet/dist/leaflet.css';
import Logo from './icons8-coronavirus-50.png';
import InfoBox from './InfoBox';
import Map from './Map.js';
import Table from './Table';
import LineGraph from './LineGraph';
import DescriptionTable from './DescriptionTable';
import YouTubeTable from './YouTubeTable';
import {sortData, prettyPrintStat} from './util';

function App() {

  const backgroundTypeColors = {
    cases: {
      custom_op: "rgba(255, 255, 255, 0.75)"
    },
    recovered: {
      custom_op: "rgba(255, 255, 255, 0.75)"
    },
    deaths: {
      custom_op: "rgba(255, 255, 255, 0.75)"
    },
  };

  const [countries, setCountries] = useState([]);
  const [soretdCountries, setSortedCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('worldwide');
  const [selectedCountryData, setSelectedCountryData] = useState({});
  const [mapCenter, setMapCenter] = useState({lat: 54.5260, lng: 15.2551});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries]= useState([]);
  const [casesType, setCasesType] = useState('cases');
  const [backgroundColor, setBackgroundColor] = useState(backgroundTypeColors.cases.custom_op);
  const [vaccineDetails, setVaccineDetails] = useState([]);

  const casesTypeColors = {
    cases: {
      custom_op: "rgba(66, 36, 119, 1)"
    },
    recovered: {
      custom_op: "rgba(9, 109, 35, 0.75)"
    },
    deaths: {
      custom_op: "rgba(119, 1, 0, 1)"
    },
  };

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

  useEffect(() => {
    async function loadVaccineTrials() {
      try {
        const trials = await (await fetch(`${backendURL}/trials/vaccines`)).json();
        const test = trials.map(trial => ({trial, selected: false}));
        setVaccineDetails(test);
      } catch (error) {
        handleError(error);
      }
    }
    loadVaccineTrials();
  },[]);

  function handleError(error) { // TODO: Rework this logic.
    alert('There was a problem fetching some data. please try again later.');
    console.log("there was an error", error);
  }

  useEffect(() =>  {
    const getCountrylist = async () => {
      try {
        const countryList = await (await fetch(`${backendURL}/get_countries`)).json();
        setCountries(countryList); // Set our countries object to our country list array.
        setMapCountries(countryList);
        setSortedCountries(sortData([...countryList]));
        document.body.style = `background: ${casesTypeColors.cases.custom_op}; -webkit-transition: background 1000ms linear; -ms-transition: background 1000ms linear; transition: background 1000ms linear;`; // Set body background coloe
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

  function changeParams(clickedCase) {
    setCasesType(clickedCase);
    document.body.style = `background: ${casesTypeColors[clickedCase].custom_op}; -webkit-transition: background 1000ms linear; -ms-transition: background 1000ms linear; transition: background 1000ms linear;`;
    if (clickedCase === 'cases')
      setBackgroundColor(backgroundTypeColors.cases.custom_op);
    else if (clickedCase === 'deaths')
      setBackgroundColor(backgroundTypeColors.deaths.custom_op);
    else if (clickedCase === 'recovered')
      setBackgroundColor(backgroundTypeColors.recovered.custom_op);
  }

  function selectVaccineTable(i) {

    var details = [...vaccineDetails];

    if (details[i].selected) {
      details[i].selected = false;
    } else {
      details[i].selected = true;
    }

    setVaccineDetails(details);

    setBackgroundColor(backgroundColor);
    // changeParams('deaths')
  }

  return (
    <div className="app">
    <div className="app__left">
      <div className="app__header">
        <div className="app__header__title">
          <img src={Logo} />
          <h1 style={{color: 'white'}}>Covid-19 Live Stats</h1>
        </div>
        {/* Create a dropdown box to display country names and codes*/}
        <FormControl style={{backgroundColor: backgroundColor}} className="app__dropdown">
          <Select variant="outlined" value={selectedCountry} onChange={countryChange}>
          <MenuItem value="worldwide"><img className="flag-img" src="https://vignette.wikia.nocookie.net/oratia/images/6/63/Global_union_flag.png/revision/latest/top-crop/width/360/height/450?cb=20151225033917" alt="Country Flag" style={{marginRight: '10px', width: '15px', height: '15px'}}/>World Wide</MenuItem>
          {
            countries.map(country => (<MenuItem value={country.iso3}><img className="flag-img" src={country.flag} alt="Country Flag" style={{marginRight: '10px'}}/>{country.country}</MenuItem>))
          }
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox isPurple backgroundColor={backgroundColor} active={casesType === "cases"} onClick={e => changeParams('cases')} title="Today's Cases:" cases={prettyPrintStat(selectedCountryData.today)} totalCases={prettyPrintStat(selectedCountryData.cases)} />
        <InfoBox isGreen backgroundColor={backgroundColor} active={casesType === "recovered"} onClick={e => changeParams('recovered')} title="Recovered Today:" cases={prettyPrintStat(selectedCountryData.recoveredToday)} totalCases={prettyPrintStat(selectedCountryData.recovered)} />
        <InfoBox isRed backgroundColor={backgroundColor} active={casesType === "deaths"} onClick={e => changeParams('deaths')} title="Deaths Today:" cases={prettyPrintStat(selectedCountryData.deathsToday)} totalCases={prettyPrintStat(selectedCountryData.deaths)} />
      </div>

      <Map backgroundColor={backgroundColor} cases={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />

      <YouTubeTable backgroundColor={backgroundColor} src="https://www.youtube.com/embed?v=BtN-goy9VOY&ab_channel=Kurzgesagt%E2%80%93InaNutshell" />

      <div className="vaccine__box" style={{backgroundColor: backgroundColor}}>
        <h1>Vaccine Trials:</h1>
        {
          vaccineDetails.map((study, i) => (
            <DescriptionTable i={i} onClick={e => selectVaccineTable(i)} isSelected={study.selected} backgroundColor={backgroundColor} study={study.trial}></DescriptionTable>
           ))
        }
      </div>

    </div>
    <Card style={{backgroundColor: backgroundColor}} className="app__right">
      <CardContent>
        <h3>Live Cases Today</h3>
        <Table countries={soretdCountries} />
        <h3 className="app__graphTitle">Worlwide new {casesType}</h3>
        <LineGraph className="app__graph" cases={casesType} />
        {/* Graph */}
      </CardContent>
    </Card>
      
    </div>
  );
}

export default App;