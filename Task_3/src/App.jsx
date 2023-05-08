import React from "react";
import CountryTable from "./components/pages/CountryTable";
const App = () => {
  const countryData = [
    {
      "name": "China",
      "population": 1404328611,
      "area": 9596960
    },
    {
      "name": "India",
      "population": 1368737513,
      "area": 3287263
    },
    {
      "name": "United States",
      "population": 330193529,
      "area": 9833520
    },
    {
      "name": "Indonesia",
      "population": 269536482,
      "area": 1910931
    },
    {
      "name": "Pakistan",
      "population": 220892340,
      "area": 881912
    }
  ];
  return (
    <>
      <CountryTable data={countryData}/>
    </>
  );
};

export default App;
