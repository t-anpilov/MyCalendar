import React, { useRef, useState } from 'react';
import { Row } from './components/Row'
import { Shifts } from './models/Shifts'
import './App.css';

function App() {
    
    const [requiredDate, setRequiredDate] = useState(new Date());
    const refDateContainer = useRef<HTMLInputElement>(null);
    const handleDateInput = () => {
      
      let enteredDate: Date | null = null;
      if (refDateContainer.current) enteredDate = new Date(refDateContainer.current.value);
      
      if (enteredDate !== null) {
        setRequiredDate(enteredDate);
      };     
    };

    
    let currentShifts = new Shifts(new Date(requiredDate))
    return (
      <div className="App">
        <form>
          <input 
            type="date" 
            ref={refDateContainer}
            onChange={handleDateInput}
          />
        </form>
        <Row
          shifts={ currentShifts.calculateShifts }
        />
      </div>
    );
}

export default App;
