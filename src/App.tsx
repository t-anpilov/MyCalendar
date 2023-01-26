import React from 'react';
import { Row } from './components/Row'
import { Shifts } from './models/WorkDay'
import './App.css';

function App() {
  let requiredDate = '2023-01-27'
  let currentShifts = new Shifts(new Date(requiredDate))
  return (
    <div className="App">
      <Row
        shifts={ currentShifts.calculateShifts }
      />
    </div>
  );
}

export default App;
