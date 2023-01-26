import React from 'react';
import { Cell } from './Cell'
import { Shift } from '../models/WorkDay';

type RowProps = {
   shifts: Shift[]
};

export const Row:React.FC<RowProps> = props => {

    return (
        <div className='DateBlock'>
            <header>{props.shifts[0].date?.toLocaleDateString()}</header>
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