import { React, createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

const PlanetsContext = createContext({});
const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

export const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);

  const { results, isLoading, error } = useFetch(URL);

  useEffect(() => {
    setPlanets(results);
  }, [results]);

  return (
    <PlanetsContext.Provider
      value={ {
        planets, isLoading, error,
      } }
    >
      { children }
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetsProvider;
