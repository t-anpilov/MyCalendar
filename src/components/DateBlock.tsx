import React from 'react';
import { Cell } from './Cell'
import { Shift } from '../models/Shifts';
import { DateFormat } from '../models/DateFormat'

type BlockProps = {
   shifts: Shift[];
   id: string,
};

export const DateBlock:React.FC<BlockProps> = props => {

    let dateElements: string[] = [];
    let weekend: Boolean = false;
    const blockStyles = ['regular dateBlock', 'weekend dateBlock'];

    if (props.shifts[0].date) {
        let dateFormat = new DateFormat(props.shifts[0].date);
        dateElements = [...dateFormat.getFormatedDate];
        weekend = dateFormat.checkIfWeekend
    }   
    

    return (
        <div 
            className={weekend ? blockStyles[1] : blockStyles[0]} 
            key={props.id}
        >
            <h3>{dateElements[0]}</h3>
            <h4>{dateElements[1]}</h4>
            <ul>
            {
                props.shifts.map(shift => {
                    return (
                        <Cell
                            type = {shift.type}
                            style = {shift.style}
                            date = {shift.date}
                            shiftLead = {shift.shiftLead}
                            id = {shift.id}
                            key = {shift.id}
                        />
                    )
                })
            }
            </ul>
        </div>
    );
};