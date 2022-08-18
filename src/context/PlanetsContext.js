import { React, createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import { filterResults } from '../utils/helperFunctions';

const PlanetsContext = createContext({});
const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

export const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filterValues, setFilterValues] = useState([]);
  const filters = { filterByName: { name }, filterValues };
  const { results, isLoading, error } = useFetch(URL);
  console.log(filterValues);
  useEffect(() => setPlanets(results), [results]);

  useEffect(() => {
    const filteredResults = planets.filter((planet) => (planet.name.toLowerCase())
      .includes(name.toLowerCase()))
      .filter((planet) => filterResults(planet, filterValues));
    setSearchResults(filteredResults);
  }, [planets, name, filterValues]);

  return (
    <PlanetsContext.Provider
      value={ { planets,
        isLoading,
        error,
        filters,
        setName,
        searchResults,
        filterValues,
        setFilterValues } }
    >
      { children }
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetsContext;
