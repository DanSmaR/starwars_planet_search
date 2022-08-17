import React from 'react';
import PropTypes from 'prop-types';
import { formatTitle } from '../../utils/helperFunctions';

function Table({ planets }) {
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
      </table>
    </div>
  );
}

Table.propTypes = {
  planets: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default Table;
