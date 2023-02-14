import React from 'react';
import { Shift } from '../models/Shifts'

type CellProps = Shift;

export const Cell:React.FC<CellProps> = props => {

    
    return (         
      <li 
        key={props.id}         
        className = {props.style}
      >
        {props.shiftLead} <br/> [ {props.type} ]
      </li>
    );
}