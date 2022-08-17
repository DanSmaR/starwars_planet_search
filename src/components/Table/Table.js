import React from 'react';
import PropTypes from 'prop-types';
import { formatTitle } from '../../utils/helperFunctions';

function Table({ planets }) {
  console.log(planets);
  return (
    <div>
      <table>
        <thead>
          <tr>
            { Object.keys(planets[0]).map((title, index) => (
              <th key={ index }>{ formatTitle(title) }</th>
            )) }
          </tr>
        </thead>
        <tbody>
          {
            planets.map((planet) => (
              <tr key={ planet.created }>
                {
                  Object.keys(planet).map((itemKey, index) => (
                    <td key={ index }>{planet[itemKey]}</td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  planets: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default Table;
