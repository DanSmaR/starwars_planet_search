import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../components/App/App';
import { mockData } from '../utils/constants';
import userEvent from '@testing-library/user-event';
import planetsName, { descendingPlanetsName, filterValues } from './utils/constants';
import { filterResults } from '../utils/helperFunctions';

const planetOne = 'Endor';

const getTableCell = (name) => screen.getByRole('cell', { name: name });
const queryTableCell = (name) => screen.queryByRole('cell', { name: name });
const getButton = (name) => screen.getByRole('button', { name: name });
const getButtons = (name) => screen.getAllByRole('button', { name: name });
const queryButtons = (name) => screen.queryAllByRole('button', { name: name });
const getNumberInputValue = () => screen.getByRole('spinbutton', { name: "Value" });
const getSelectInput = (name) => screen.getByRole('combobox', { name: name });
const querySelectInput = (name) => screen.queryByRole('combobox', { name: name });
const getSelectedOption = (value) => screen.getByRole('option', { name: value }).selected;
const getRadioBtn = (name) => screen.getByRole('radio', { name: name });
const getSearchInput = () => screen.getByRole('textbox', { name: /search planets/i });

function fillInFilterFormInputs({ column, comparison, value }) {
  userEvent.clear(getNumberInputValue());
  userEvent.selectOptions(getSelectInput(/column/i), [column]);
  userEvent.selectOptions(getSelectInput(/comparison operator/i), [comparison]);
  userEvent.type(getNumberInputValue(), value);
}
function fillInOrderFormInputs(radioInputName, { column }) {
  userEvent.clear(getRadioBtn(radioInputName));
  userEvent.selectOptions(getSelectInput(/ordenar/i), [column]);
  userEvent.click(getRadioBtn(radioInputName));
}

describe('Testing the Star Wars Planets Search page', () => {
  beforeEach(async() => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
    render(<App />)
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Testing the searching bar', () => {
    it('should show only the planets that match the word typed in search bar', () => {
      userEvent.type(getSearchInput(), planetOne);
      expect(getTableCell(/endor/i)).toBeInTheDocument();
      planetsName.forEach((name) => {
        if (name === planetOne) return;
        expect(queryTableCell(name)).not.toBeInTheDocument();
      })
    });

    it('shouldn\'t display any planets on the screen if type a no correponding planet name', () => {
      userEvent.type(getSearchInput(), 'inexistent planet');
      expect(screen.getByText('No Planets to Display')).toBeInTheDocument();
    });
  });

  describe('Testing the filter options', () => {
    it('should only show the planets that match the filter values', () => {
      filterValues.forEach((filterValue) => {
        fillInFilterFormInputs(filterValue);
        userEvent.click(getButton(/filtrar/i));
      });
      const expectedPlanets = mockData.results.filter((planet) => filterResults(planet, filterValues));
      const notExpectedPlanets = mockData.results.filter((planet) => !filterResults(planet, filterValues));
      expectedPlanets.forEach(({ name }) => expect(getTableCell(name)).toBeInTheDocument());
      notExpectedPlanets.forEach(({ name }) => expect(queryTableCell(name)).not.toBeInTheDocument());
    });

    it('should appear a description list showing the filters applied with the corresponding button to delete each one', () => {
      filterValues.forEach((filterValue) => {
        fillInFilterFormInputs(filterValue);
        userEvent.click(getButton(/filtrar/i));
      });
      const listItems = screen.getAllByRole('listitem');
      const deleteButtons = getButtons(/x/i);
      expect(listItems).toHaveLength(5);
      expect(deleteButtons).toHaveLength(5);
      listItems.forEach((listItem, index) => {
        const { column, comparison, value } = filterValues[index];
        const text = `${column} ${comparison} ${value} X`;
        expect(listItem).toHaveTextContent(text);
      })
    });

    it('should remove each filter when clicking on each one respective delete button. And the planets that were removed should appear again', () => {
      filterValues.forEach((filterValue) => {
        fillInFilterFormInputs(filterValue);
        userEvent.click(getButton(/filtrar/i));
      });

      filterValues.forEach((_, index, filterArr) => {
        const deleteButtons = getButtons(/x/i);
        const lastIndex = filterArr.length - 1 - index;
        userEvent.click(deleteButtons[lastIndex]);
        const newFilterValues = filterArr.slice(0, lastIndex);
        const expectedPlanets = mockData.results.filter((planet) => filterResults(planet, newFilterValues));
        const notExpectedPlanets = mockData.results.filter((planet) => !filterResults(planet, newFilterValues));
        expectedPlanets.forEach(({ name }) => expect(getTableCell(name)).toBeInTheDocument());
        notExpectedPlanets.forEach(({ name }) => expect(queryTableCell(name)).not.toBeInTheDocument());
      })
    });

    it('should remove all the filters at once when clicking on the "REMOVER FILTROS" button. And should the all planets to be in the page', () => {
      filterValues.forEach((filterValue) => {
        fillInFilterFormInputs(filterValue);
        userEvent.click(getButton(/filtrar/i));
      });
      userEvent.click(getButton(/remover filtros/i));
      expect(queryButtons(/x/i)).toHaveLength(0);
      userEvent.click(getButton(/remover filtros/i));
      expect(queryButtons(/x/i)).toHaveLength(0);
      mockData.results.forEach(({ name }) => expect(getTableCell(name)).toBeInTheDocument());
    });

    it('should not add more filters if all the filters options were applied when clicking on "Filtrar" button again. And the Column Select option should be empty', () => {
      filterValues.forEach((filterValue) => {
        fillInFilterFormInputs(filterValue);
        userEvent.click(getButton(/filtrar/i));
      });
      userEvent.click(getButton(/filtrar/i));
      const listItems = screen.getAllByRole('listitem');
      const deleteButtons = getButtons(/x/i);
      expect(listItems).toHaveLength(5);
      expect(deleteButtons).toHaveLength(5);
      filterValues.forEach(({ column }) => {
        expect(querySelectInput(column)).toBeNull();
      });
    });
  });

  describe('Testing the ordering filter', () => {
    it('should order the planets in ascending order based on the values of the column selected when "Ascendente" radio button is selected and "Filtrar" button is clicked', () => {
      fillInOrderFormInputs(/ascendente/i, filterValues[0]);
      userEvent.click(getButton(/ordenar/i));
      const listedPlanets = screen.getAllByTestId('planet-name');
      listedPlanets.forEach((planet, index) => {
        expect(planet).toHaveTextContent(planetsName[index]);
      })
    });

    it('should order the planets in ascending order based on the values of the column selected when "Ascendente" radio button is selected and "Filtrar" button is clicked', () => {
      fillInOrderFormInputs(/descendente/i, filterValues[0]);
      userEvent.click(getButton(/ordenar/i));
      const listedPlanets = screen.getAllByTestId('planet-name');
      listedPlanets.forEach((planet, index) => {
        expect(planet).toHaveTextContent(descendingPlanetsName[index]);
      })
      screen.logTestingPlaygroundURL();
    });
  });
});

describe('testing the API response', () => {
  describe('testing the failed response', () => {
    beforeEach(async() => {
      jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.reject(new Error('API is down'))
      );
      render(<App />)
      await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    });

    afterEach(() => {
      jest.resetAllMocks();
    });
    it('should show the error message in tha page', () => {
      expect(screen.getByText('API is down')).toBeInTheDocument();
    });
  });
});
