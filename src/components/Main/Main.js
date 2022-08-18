import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filter/Filter';
import Table from '../Table/Table';

function Main() {
  const { searchResults, isLoading, error } = useContext(PlanetsContext);
  return (
    <div>
      <SearchBar />
      <Filter />
      { isLoading && <p>Loading Planets...</p> }
      { !isLoading && error && <p>{ error }</p> }
      { !isLoading && !error && (searchResults.length
        ? <Table planets={ searchResults } />
        : <p>No Planets to Display</p>) }
    </div>
  );
}

export default Main;
