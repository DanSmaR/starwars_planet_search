import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';
import { formatTitle } from '../../utils/helperFunctions';

function Table() {
  const { searchResults, isLoading, error } = useContext(PlanetsContext);

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
                  { Object.keys(planet).map((itemKey, index) => {
                    if (index === 0) {
                      return (
                        <td key={ index } data-testid="planet">{planet[itemKey]}</td>
                      );
                    }
                    return (<td key={ index }>{planet[itemKey]}</td>);
                  }) }
                </tr>
              )) }
            </tbody>
          </table>) : <p>No Planets to Display</p>) }

    </div>
  );
}

export default Table;
