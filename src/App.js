import React from 'react';
import { useEffect, useState } from 'react';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core'
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph';
import LineGraphD from './LineGraphDeaths';
import { sortData } from './util';


// https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState('cases');
  const [deathsType, setDeathsType] = useState('deaths');
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    //runs one time when component loads and when variable changes
    const getCountries = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //Country names
            value: country.countryInfo.iso2 //Country codes
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          console.log(sortedData);
          setMapCountries(data);
          setCountries(countries);
          console.log((countries))
        });
    };

    getCountries();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    //ternary operator
    const url = countryCode === 'worldwide'
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.lng]);
        setMapZoom(4);
      });
  };



  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 Dashboard</h1>
          <FormControl className="app_dropdown">
            <Select variant='outlined' onChange={onCountryChange} value={country}>
              <MenuItem value='worldwide'>Wordwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox title='COVID-19 Cases' cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title='COVID-19 Recoveries' cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title='COVID-19 Deaths' cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>
      <br></br>
      <div>
        <Card className="app_right">
          <CardContent>
            <h3>Worldwide Cases</h3>
            <LineGraph casesType={casesType} />
            <br></br>
            <br></br>
            <h3>Worldwide Deaths</h3>
            <LineGraphD deathsType={deathsType} />
            <br></br>
            <br></br>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
          </CardContent>
        </Card>
      </div>
    </div >
  );
}

export default App;
