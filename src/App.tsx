import React from 'react';
import { Row } from './components/Row'
import { Shifts } from './models/Shifts'
import './App.css';

function App() {
  let requiredDate = '2023-01-26'
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
