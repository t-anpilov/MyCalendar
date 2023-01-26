import React from 'react';
import { Row } from './components/Row'
import { workDays } from './models/WorkDay'
import './App.css';

function App() {
  return (
    <div className="App">
      <Row
        shifts={ workDays }
      />
    </div>
  );
}

export default App;
