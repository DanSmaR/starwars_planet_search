import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filter/Filter';
import Table from '../Table/Table';

function Main() {
  const { planets, isLoading, error } = useContext(PlanetsContext);
  return (
    <div>
      <SearchBar />
      <Filter />
      { isLoading && <p>Loading Planets...</p> }
      { !isLoading && error && <p>{ error }</p> }
      {
        !isLoading && !error && (planets.length ? <Table planets={ planets } /> : (
          <p>No Planets to Display</p>))
      }
    </div>
  );
}

export default Main;
