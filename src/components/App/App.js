import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filter/Filter';
import Table from '../Table/Table';
import { PlanetsProvider } from '../../context/PlanetsContext';

function App() {
  return (
    <PlanetsProvider>
      <SearchBar />
      <Filter />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
