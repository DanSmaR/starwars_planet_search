import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../components/App/App';
import { mockData } from '../utils/constants';

describe('Name of the group', () => {

  beforeEach(async() => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
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

  test('I am your test', async() => {
    screen.logTestingPlaygroundURL();
  });
});
