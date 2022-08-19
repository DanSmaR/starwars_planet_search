import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../components/App/App';
import Main from '../components/Main/Main';
import Table from '../components/Table/Table';
import { PlanetsProvider } from '../context/PlanetsContext';
import { mockData } from '../utils/constants';
import { act } from 'react-dom/test-utils';

describe('Name of the group', () => {

  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('I am your test', async() => {
    await act(async() => {
      render(<App />)
      await waitFor(() => expect(global.fetch).toHaveBeenCalled());
      // await waitForElementToBeRemoved(screen.queryByText(/loading/i));
      // expect(screen.findByText(/name/)).toBeInTheDocument()
      screen.logTestingPlaygroundURL();
      // expect(screen.getByText("Name")).toBeInTheDocument();
    })
  });
});
