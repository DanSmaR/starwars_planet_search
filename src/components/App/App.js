import React from 'react';
import './App.css';
import Main from '../Main/Main';
import { PlanetsProvider } from '../../context/PlanetsContext';

function App() {
  return (
    <div>
      <PlanetsProvider>
        <Main />
      </PlanetsProvider>
    </div>
  );
}

export default App;
