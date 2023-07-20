import React, { useEffect, useRef, useState } from 'react';
import { DateBlock } from './DateBlock';
import { Shifts } from '../models/Shifts';

export const DateRow:React.FC = ()=> {
        
    const refDateContainer = useRef<HTMLInputElement>(null);
    const [dates, setDates] = useState<Date[]>([]);
    const [daysNumber, setDaysNumber] = useState<number>(4);
    
    const daysNumbersSelect = ['', 1, 3, 4, 7, 10];
    const msPerDay = 1000*60*60*24;

    const addId = () => Math.round(Math.random()*1000).toString();
    
    useEffect (() => {
                
      let requiredDates: Date [] = [];

      if (!dates.length && daysNumber) {
        
        let currentDate = new Date();
        let currentDateUTC = new Date(currentDate.setUTCHours(0, 0, 0, 0)); // setting to utc format    
        for (let i=0; i<daysNumber; i++) {
          let newDate = new Date(+currentDateUTC + msPerDay*i);          
          requiredDates.push(newDate);
        };
        //console.log(requiredDates);
        setDates([...requiredDates]);
      }      
      
    }, []);


    const renderDates = (startDate: Date, count: number ) => {
      let requiredDates: Date [] = [];
      const startDayUTC = new Date(startDate.setUTCHours(0, 0, 0, 0))
      for (let i=0; i<count; i++) {
        let newDate = new Date(+startDayUTC + msPerDay*i);
        requiredDates.push(newDate);
      };
      if (requiredDates.length > 0) {
        //console.log(requiredDates);
        setDates([...requiredDates]);
        }
    }; 

    const handleDateInput = () => {

      let enteredDate: Date | null = null;
      if (refDateContainer.current && daysNumber) {
        enteredDate = new Date(refDateContainer.current.value);
        renderDates(enteredDate, daysNumber);
      };  
    };

    const handleNumberInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.target && e.target.value) {
        let eneteredNumber:number = Number(e.target.value); 
        renderDates(dates[0], eneteredNumber);       
        setDaysNumber(eneteredNumber); 
               
      } 
    }
    
    return (
      <div className='commonView'>
        <form className='dateInput'>
          <div>
          <label htmlFor="choseDate">Коли &nbsp; &nbsp;</label>
          <input 
            className='inputField'
            name ="choseDateInput"
            id ="choseDate"
            type="date" 
            ref={refDateContainer}
            onInput={handleDateInput}
            onKeyDown={(e) => e.preventDefault()}
            placeholder = {(new Date()).toLocaleDateString()}
          />
          </div>
          <div>
          <label htmlFor="numberOfDays">Timerange &nbsp; &nbsp;</label>
          <select             
            className='inputField'
            name ="numberOfDaysSelect"
            id ="numberOfDays"
            onChange={handleNumberInput}
          >
            {
              daysNumbersSelect.map((value: number | string) => {
                return (
                  <option key = {value.toString()} value = {value}>
                    {value ? `${value} days` : ''}
                  </option>
                )
              })
            }
          </select>
          </div> 
        </form>
        <div className='container'>
        {
            dates.map((date) => {
                let currentShifts = new Shifts(date);
                let newId = addId()
                return (
                    <DateBlock
                        shifts={ currentShifts.calculateShifts }
                        id = {newId}
                        key = {newId}
                    />
                );
            })
        }
        </div>        
      </div>
    );
}