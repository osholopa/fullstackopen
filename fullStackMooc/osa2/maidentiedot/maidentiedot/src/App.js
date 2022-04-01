import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [showCountries, setShowCountries] = useState(false);

  const handleSearchInput = event => {
    setSearch(event.target.value);
    event.target.value === ""
      ? setShowCountries(false)
      : setShowCountries(true);
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <Filter search={search} handleSearchInput={handleSearchInput} />
      <Countries
        search={search}
        countries={countries}
        showCountries={showCountries}
      />
    </div>
  );
}

export default App;
