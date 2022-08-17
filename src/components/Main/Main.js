import React from 'react';
import { PlanetsProvider } from '../../context/PlanetsContext';
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filter/Filter';
import Table from '../Table/Table';

function Main() {
  return (
    <div>
      <PlanetsProvider>
        <SearchBar />
        <Filter />
        <Table />
      </PlanetsProvider>
    </div>
  );
}

export default Main;
