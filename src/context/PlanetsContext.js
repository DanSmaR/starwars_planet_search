import { React, createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { filterResults } from '../utils/helperFunctions';
import useFetch from '../hooks/useFetch';

const PlanetsContext = createContext({});
const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

export const PlanetsProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filterValues, setFilterValues] = useState([]);
  const filters = { filterByName: { name }, filterValues };
  const { results, isLoading, error } = useFetch(URL);

  useEffect(() => {
    const filteredResults = results.filter((planet) => (planet.name.toLowerCase())
      .includes(name.toLowerCase()))
      .filter((planet) => filterResults(planet, filterValues));
    setSearchResults(filteredResults);
  }, [results, name, filterValues]);

  return (
    <PlanetsContext.Provider
      value={ { results,
        isLoading,
        error,
        filters,
        name,
        setName,
        searchResults,
        filterValues,
        setFilterValues,
        setSearchResults } }
    >
      { children }
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PlanetsContext;
