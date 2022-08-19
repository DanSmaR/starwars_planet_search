import { React, createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { filterResults, orderResults } from '../utils/helperFunctions';
import useFetch from '../hooks/useFetch';

const PlanetsContext = createContext({});
const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

export const PlanetsProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filterValues, setFilterValues] = useState([]);
  const [order, setOrder] = useState({});
  const filters = { filterByName: { name }, filterValues, order };
  const { results, isLoading, error } = useFetch(URL);

  useEffect(() => {
    const filteredResults = results.filter((planet) => (planet.name.toLowerCase())
      .includes(name.toLowerCase()))
      .filter((planet) => filterResults(planet, filterValues));

    if (!order.column && !order.sort) {
      setSearchResults(filteredResults);
      return;
    }
    const orderedResults = orderResults(filteredResults, order);
    setSearchResults(orderedResults);
  }, [results, name, filterValues, order]);

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
        setOrder,
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
