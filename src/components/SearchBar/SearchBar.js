import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

function SearchBar() {
  const { filters, setName } = useContext(PlanetsContext);
  const { filterByName: { name } } = filters;
  return (
    <header>
      <h1>Projeto Star Wars Trybe</h1>
      <form>
        <p>
          <label htmlFor="search-name">
            Search Planets
            { ' ' }
            <input
              id="search-name"
              type="text"
              data-testid="name-filter"
              placeholder="Search Planet"
              name="name"
              value={ name }
              onChange={ (e) => setName(e.target.value) }
            />
          </label>
        </p>
      </form>
    </header>
  );
}

export default SearchBar;
