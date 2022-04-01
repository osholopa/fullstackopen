import React, { useState } from "react";
import Country from "./Country";

const CountryList = props => {
  const { countries } = props;
  const [showOne, setShowOne] = useState(false);
  const [country, setCountry] = useState([]);

  const handleClick = country => {
    setShowOne(true);
    setCountry(country);
  };

  if (showOne) {
    return <Country country={country} />;
  } else {
    return (
      <>
        {countries.map(country => (
          <div key={country.alpha2Code}>
            <p>{country.name}</p>
            <button onClick={() => handleClick(country)}>Show</button>
          </div>
        ))}
      </>
    );
  }
};

export default CountryList;
