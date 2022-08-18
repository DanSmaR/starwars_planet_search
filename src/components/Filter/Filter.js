import React, { useState, useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';
import { columnsFilter, comparisonOperators } from '../../utils/constants';

function Filter() {
  const { setFilterValues } = useContext(PlanetsContext);
  const [column, setColumn] = useState(columnsFilter[0]);
  const [comparison, setComparison] = useState(comparisonOperators[0]);
  const [valueNum, setValueNum] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    setFilterValues([{ column, comparison, value: valueNum }]);
  }

  return (
    <section>
      <form onSubmit={ handleSubmit }>
        <p>
          <label htmlFor="column-filter">
            Column
            { ' ' }
            <select
              name="column"
              id="column-filter"
              data-testid="column-filter"
              value={ column }
              onChange={ ({ target }) => setColumn(target.value) }
            >
              { columnsFilter.map((columnName, index) => (
                <option key={ index } value={ columnName }>
                  { columnName }
                </option>
              ))}
            </select>
          </label>
        </p>
        <p>
          <label htmlFor="comparison-filter">
            Comparison operator
            { ' ' }
            <select
              name="operator"
              id="comparison-filter"
              data-testid="comparison-filter"
              value={ comparison }
              onChange={ ({ target }) => setComparison(target.value) }
            >
              { comparisonOperators.map((item, index) => (
                <option key={ index } value={ item }>
                  { item }
                </option>
              )) }
            </select>
          </label>
        </p>
        <p>
          <label htmlFor="value-filter">
            Value
            { ' ' }
            <input
              name="valueNum"
              type="number"
              data-testid="value-filter"
              value={ valueNum }
              onChange={ ({ target }) => setValueNum(target.value) }
            />
          </label>
        </p>
        <p>
          <button type="submit" data-testid="button-filter">Filtrar</button>
        </p>
      </form>
    </section>
  );
}

export default Filter;
