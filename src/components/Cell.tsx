import React from 'react';
import { Shift } from '../models/WorkDay'

type CellProps = Shift;

const cellStyles: string[] = ['vacation', 'sickLeave', 'changeShift']

export const Cell:React.FC<CellProps> = props => {

    
    return (         
      <li key={props.id} placeholder = {props.date?.toDateString()}>
        {props.shiftLead} <br/> ({props.type})
      </li>
    );
}