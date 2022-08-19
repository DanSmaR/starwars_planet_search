import { React, createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { extractKeyFromEachObjInArray } from '../utils/helperFunctions';

const PlanetsContext = createContext({});
const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

export const PlanetsProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filterValues, setFilterValues] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const filters = { filterByName: { name }, filterValues };

  useEffect(() => {
    setLoading(true);
    function getData() {
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          setResults(extractKeyFromEachObjInArray(data.results, 'residents'));
        })
        .catch((err) => {
          console.log('Error', err.message);
          setError(err);
        })
        .finally(() => setLoading(false));
    }
    getData();
    return () => {};
  }, []);

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
