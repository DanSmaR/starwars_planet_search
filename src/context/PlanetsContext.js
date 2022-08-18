import { React, createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

const PlanetsContext = createContext({});
const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

export const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const filters = {
    filterByName: { name },
  };

  const { results, isLoading, error } = useFetch(URL);

  useEffect(() => {
    setPlanets(results);
  }, [results]);

  useEffect(() => {
    const filteredResults = planets.filter((planet) => (planet.name.toLowerCase())
      .includes(name.toLowerCase()));
    setSearchResults(filteredResults);
  }, [planets, name]);

  return (
    <PlanetsContext.Provider
      value={ {
        planets, isLoading, error, filters, setName, searchResults,
      } }
    >
      { children }
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetsContext;
