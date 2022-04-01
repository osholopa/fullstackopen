import React from "react";
import Country from "./Country";
import CountryList from "./CountryList";

const Countries = props => {
  const { countries, search, showCountries } = props;

  let countriesToShow = showCountries
    ? countries.filter(country =>
        country.name.toUpperCase().includes(search.toUpperCase())
      )
    : [];

  let countryContainer;

  if (countriesToShow.length > 10) {
    countryContainer = <p>Too many matches, specify another filter</p>;
  } else if (countriesToShow.length === 1) {
    countryContainer = <Country country={countriesToShow[0]} single={true} />;
  } else if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
    countryContainer = <CountryList countries={countriesToShow}></CountryList>;
  } else {
    countryContainer = <div></div>;
  }
  return <div>{countryContainer}</div>;
};

export default Countries;
