import React, {useState, useEffect} from 'react';
import {
  CircularProgress, MenuItem,
  Select, FormControl, 
  Card, CardContent
} from '@material-ui/core';
import './css/App.css';
import 'leaflet/dist/leaflet.css';
import Logo from './icons8-coronavirus-50.png';
import InfoBox from './js/InfoBox';
import Map from './js/Map.js';
import Table from './js/Table';
import LineGraph from './js/LineGraph';
import DescriptionTable from './js/DescriptionTable';
import YouTubeTable from './js/YouTubeTable';
import {useWindowDimensions, sortData, prettyPrintStat} from './js/utils/util';

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

  const [countries, setCountries] = useState([]);
  const [soretdCountries, setSortedCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('worldwide');
  const [selectedCountryData, setSelectedCountryData] = useState({});
  const [mapCenter, setMapCenter] = useState({lat: 54.5260, lng: 15.2551});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries]= useState([]);
  const [filteredMapCountries, setFilteredMapCountries]= useState([]);
  const [casesType, setCasesType] = useState('cases');
  const [backgroundColor, setBackgroundColor] = useState(backgroundTypeColors.cases.custom_op);
  const [vaccineDetails, setVaccineDetails] = useState([]);
  const [originalVaccineDetails, setOriginalVaccineDetails] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showAllCountriesOnMap , setShowAllCountriesOnMap] = useState(true);
  const [initialMapLoad, setInitialMapLoad] = useState(true);
  const { height, width } = useWindowDimensions();

  const backendURL = process.env.NODE_ENV === 'production' ? 'https://covid-tracker-captain-b.herokuapp.com' : process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    async function loadCountries() {
      setLoading(true);
      try {
        const info = await (await fetch(`${backendURL}/get_countries/worldwide`)).json();
        setLoading(false);
        setSelectedCountryData(info); // Set and display the selected country
      } catch (error) {
        handleError(error);
      }
    }
    loadCountries();
  },[]);

  useEffect(() => {
    async function loadVaccineTrials() {
      setLoading(true);
      try {
        const trials = await (await fetch(`${backendURL}/trials/vaccines`)).json();
        setLoading(false);
        const filteredTrials = trials.map(trial => ({trial, selected: false}));
        setOriginalVaccineDetails(filteredTrials);
        setVaccineDetails(filteredTrials.slice(0, 3));
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
      setLoading(true);
      try {
        var countryList = await (await fetch(`${backendURL}/get_countries`)).json();
        setLoading(false);
        setCountries(countryList); // Set our countries object to our country list array.
        countryList = sortData([...countryList]);
        setMapCountries(countryList);
        setFilteredMapCountries(countryList);
        setSortedCountries(countryList);
        document.body.style = `background: ${casesTypeColors.cases.custom_op}; -webkit-transition: background 1000ms linear; -ms-transition: background 1000ms linear; transition: background 1000ms linear;`; // Set body background coloe
      } catch (error) {
        handleError(error);
      }
    }
    getCountrylist(); // Request the countries list from the backend.
  }, []);

  const countryChange = async (e) => {
    setLoading(true);
    const countryCode = e.target.value;
    setSelectedCountry(countryCode); // Set and display the selected country

    const endpoint = countryCode === 'worldwide' ? `${backendURL}/get_countries/worldwide` : `${backendURL}/get_countries/${countryCode}`;

    try {
      const info = await (await fetch(endpoint)).json();
      setLoading(false);
      setSelectedCountryData(info); // Set and display the selected country

      setMapCenter([1, 1]);
      if (initialMapLoad) {
        setInitialMapLoad(false);
        setTimeout(
          () => setMapCenter([info.location.lat, info.location.long]), 
          500
        );
      } else {
        setMapCenter([info.location.lat, info.location.long]);
      }
      setMapZoom(5);
    } catch (error) {
      handleError(error);
    }

    setShowAllCountriesOnMap(true);
    setFilteredMapCountries(mapCountries);
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
  }

  function showAllVaccineTrials() {
    if (showAll === true) {
      setShowAll(false);
      setVaccineDetails(originalVaccineDetails);
    } else {
      setShowAll(true);
      const original = [...originalVaccineDetails];
      const filtered = original.slice(0, 3);
      setVaccineDetails(filtered);
    }
  }

  function showAllCountries() {
    if (showAllCountriesOnMap) {
      setShowAllCountriesOnMap(false);
      setFilteredMapCountries(mapCountries.slice(0, 10));
    } else {
      setShowAllCountriesOnMap(true);
      setFilteredMapCountries(mapCountries);
    }
    setMapZoom(1.5);
  }

  function loadOriginalCountries() {
    setShowAllCountriesOnMap(true);
    setFilteredMapCountries(mapCountries);
  }

  function loadFooter() {
    return (
      <div className="custom__footer" style={{backgroundColor: backgroundColor}}>
        <h5 style={{color: 'grey'}} class="footer__owner">Captain-B &copy;</h5>
      </div>
    );
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
            <MenuItem onClick={loadOriginalCountries} value="worldwide"><img className="flag-img" src="https://vignette.wikia.nocookie.net/oratia/images/6/63/Global_union_flag.png/revision/latest/top-crop/width/360/height/450?cb=20151225033917" alt="Country Flag" style={{marginRight: '10px', width: '15px', height: '15px'}}/>World Wide</MenuItem>
            {
              countries.map(country => (<MenuItem onClick={loadOriginalCountries} value={country.iso3}><img className="flag-img" src={country.flag} alt="Country Flag" style={{marginRight: '10px'}}/>{country.country}</MenuItem>))
            }
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox isLoading={loading} isPurple backgroundColor={backgroundColor} active={casesType === "cases"} onClick={e => changeParams('cases')} title="Today's Cases:" cases={prettyPrintStat(selectedCountryData.today)} totalCases={prettyPrintStat(selectedCountryData.cases)} />
          <InfoBox isLoading={loading} isGreen backgroundColor={backgroundColor} active={casesType === "recovered"} onClick={e => changeParams('recovered')} title="Recovered Today:" cases={prettyPrintStat(selectedCountryData.recoveredToday)} totalCases={prettyPrintStat(selectedCountryData.recovered)} />
          <InfoBox isLoading={loading} isRed backgroundColor={backgroundColor} active={casesType === "deaths"} onClick={e => changeParams('deaths')} title="Deaths Today:" cases={prettyPrintStat(selectedCountryData.deathsToday)} totalCases={prettyPrintStat(selectedCountryData.deaths)} />
        </div>

        <Map showAllOnClick={showAllCountries} showAll={showAllCountriesOnMap} backgroundColor={backgroundColor} cases={casesType} countries={filteredMapCountries} center={mapCenter} zoom={mapZoom} />

        <YouTubeTable backgroundColor={backgroundColor} src="https://www.youtube.com/embed?v=BtN-goy9VOY&ab_channel=Kurzgesagt%E2%80%93InaNutshell" />

        <div className="vaccine__box" style={{backgroundColor: backgroundColor}}>
          <div className="vaccine__box__header">
            <h1>Vaccine Trials:</h1>
            {vaccineDetails.length <= 3 ? (
              <div className="header" onClick={showAllVaccineTrials} style={{backgroundColor: backgroundColor, cursor: 'pointer', textAlign: 'center'}} className="vaccine__box__header__showall">Show all {originalVaccineDetails.length} studies</div>
             ) : (
              <div className="header" onClick={showAllVaccineTrials} style={{backgroundColor: backgroundColor, cursor: 'pointer', textAlign: 'center'}} className="vaccine__box__header__showall">Show first 3 studies</div>
             )}
          </div>
          {
            loading ? (<CircularProgress />) : (
               vaccineDetails.map((study, i) => (
                  <DescriptionTable i={i} onClick={e => selectVaccineTable(i)} isSelected={study.selected} backgroundColor={backgroundColor} study={study.trial}></DescriptionTable>
               ))
             )
          }
        </div>
        {
          width >= 990 ? (loadFooter()) : ''
        }
      </div>
      <Card style={{backgroundColor: backgroundColor}} className="app__right">
        <CardContent>
          <h3>Live Cases Today</h3>
          {
            loading ? (<CircularProgress />) : (
              <Table countries={soretdCountries} />
            )
          }
          <h3 className="app__graphTitle">Worlwide new {casesType}</h3>
          {
            loading ? (<CircularProgress />) : (
              <LineGraph className="app__graph" cases={casesType} />
            )
          }
          {/* Graph */}
        </CardContent>
      </Card>
      {
        width <= 990 ? (loadFooter()) : ''
      }
    </div>
  );
}

export default App;