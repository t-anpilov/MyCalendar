import React, { useRef, useState } from 'react';
import { DateBlock } from './DateBlock';
import { Shifts } from '../models/Shifts';

export const DateRow:React.FC = ()=> {
        
    const refDateContainer = useRef<HTMLInputElement>(null);

    const [dates, setDates] = useState<Date[]>([]);
    const msPerDay = 1000*60*60*24;
    const daysNumber = 4;

    const handleDateInput = () => {

      let enteredDate: Date | null = null;
      let requiredDates: Date [] = [];
      if (refDateContainer.current) {
        enteredDate = new Date(refDateContainer.current.value);
        for (let i=0; i<daysNumber; i++) {
            let newDate = new Date(+enteredDate + msPerDay*i);
            requiredDates.push(newDate);
        };
      };       

      if (requiredDates.length > 0) {
        setDates([...requiredDates]);
      };     
    };

    return (
      <div >
        <form>
          <input 
            type="date" 
            ref={refDateContainer}
            onChange={handleDateInput}
          />
        </form>
        <div>
        {
            dates.map((date) => {
                let currentShifts = new Shifts(date);
                return (
                    <DateBlock
                        shifts={ currentShifts.calculateShifts }
                    />
                );
            })
        }
        </div>        
      </div>
    );
}