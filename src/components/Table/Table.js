import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../../context/PlanetsContext';
import { filterResults, formatTitle } from '../../utils/helperFunctions';

function Table() {
  const { searchResults, isLoading, error, results, name, filterValues, setSearchResults,
  } = useContext(PlanetsContext);

  useEffect(() => {
    const filteredResults = results.filter((planet) => (planet.name.toLowerCase())
      .includes(name.toLowerCase()))
      .filter((planet) => filterResults(planet, filterValues));
    setSearchResults(filteredResults);
  }, [results, name, filterValues]);

  return (
    <div>
      { isLoading && <p>Loading Planets...</p> }
      { !isLoading && error && <p>{ error }</p> }
      { !isLoading && !error && ((searchResults && searchResults.length)
        ? (
          <table>
            <thead>
              <tr>
                { Object.keys(searchResults[0]).map((title, index) => (
                  <th key={ index }>{ formatTitle(title) }</th>
                )) }
              </tr>
            </thead>
            <tbody>
              { searchResults.map((planet) => (
                <tr key={ planet.created }>
                  { Object.keys(planet).map((itemKey, index) => (
                    <td key={ index }>{planet[itemKey]}</td>
                  )) }
                </tr>
              )) }
            </tbody>
          </table>) : <p>No Planets to Display</p>) }

    </div>
  );
}

export default Table;
