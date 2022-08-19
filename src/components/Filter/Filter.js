import React, { useState, useContext, useEffect, useRef } from 'react';
import PlanetsContext from '../../context/PlanetsContext';
import { columnsFilter, comparisonOperators } from '../../utils/constants';

function Filter() {
  const { filterValues, setFilterValues, setOrder } = useContext(PlanetsContext);
  const [column, setColumn] = useState(columnsFilter[0]);
  const [comparison, setComparison] = useState(comparisonOperators[0]);
  const [valueNum, setValueNum] = useState(0);
  const [columnSort, setColumnSort] = useState(columnsFilter[0]);
  const formElem = useRef(null);
  const MAX_LENGTH = columnsFilter.length;

  function handleSubmit(e) {
    e.preventDefault();
    if (filterValues.length >= MAX_LENGTH) return;
    setFilterValues((prevFilterValues) => ([
      ...prevFilterValues, { column, comparison, value: valueNum },
    ]));
  }

  useEffect(() => {
    if (filterValues.length) {
      setColumn(formElem.current.column.value);
      setComparison(formElem.current.operator.value);
      setValueNum(formElem.current.valueNum.value);
    }
  }, [filterValues]);

  function handleRemoveFilter(filter) {
    if (!filterValues.length) return;
    if (filter === undefined) {
      setFilterValues([]);
      return;
    }
    setFilterValues((prevFilterValues) => prevFilterValues
      .filter((item) => item.column !== filter.column));
  }

  function handleOrderFilter() {
    console.log(formElem.current.sort.value);
    setOrder({ column: columnSort, sort: formElem.current.sort.value });
  }

  function renderOptions(columnName) {
    return (
      <option key={ columnName } value={ columnName }>
        { columnName }
      </option>
    );
  }

  return (
    <section>
      <form onSubmit={ handleSubmit } ref={ formElem }>
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
              { columnsFilter
                .filter((columnName) => {
                  if (!filterValues.length) return true;
                  return filterValues.every((item) => item.column !== columnName);
                })
                .map((columnName) => renderOptions(columnName))}
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
        <p>
          <label htmlFor="column-sort">
            Ordenar
            { ' ' }
            <select
              name="columnSort"
              id="column-sort"
              data-testid="column-sort"
              value={ columnSort }
              onChange={ ({ target }) => setColumnSort(target.value) }
            >
              { columnsFilter
                .map((columnName) => renderOptions(columnName))}
            </select>
          </label>
        </p>
        <p>
          <label htmlFor="sort-input-asc">
            <input
              type="radio"
              name="sort"
              id="sort-input-asc"
              value="ASC"
              defaultChecked
              data-testid="column-sort-input-asc"
            />
            { ' ' }
            Ascendente
          </label>
        </p>
        <p>
          <label htmlFor="sort-input-desc">
            <input
              type="radio"
              name="sort"
              id="sort-input-desc"
              value="DESC"
              data-testid="column-sort-input-desc"
            />
            { ' ' }
            Descendente
          </label>
        </p>
        <p>
          <button
            type="button"
            onClick={ handleOrderFilter }
            data-testid="column-sort-button"
          >
            Ordenar
          </button>
        </p>
        <p>
          <button
            type="button"
            onClick={ () => handleRemoveFilter() }
            data-testid="button-remove-filters"
          >
            REMOVER FILTROS
          </button>
        </p>
        <ul>
          { filterValues.length !== 0 && filterValues.map((filterObj) => (
            <li key={ filterObj.column } data-testid="filter">
              { `${filterObj.column} ${filterObj.comparison} ${filterObj.value}` }
              { ' ' }
              <button
                type="button"
                onClick={ () => handleRemoveFilter(filterObj) }
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </form>
    </section>
  );
}

export default Filter;
