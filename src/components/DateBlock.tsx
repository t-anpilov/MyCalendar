import React from 'react';
import { Cell } from './Cell'
import { Shift } from '../models/Shifts';

type BlockProps = {
   shifts: Shift[];
   id: string
};

export const DateBlock:React.FC<BlockProps> = props => {

    return (
        <div className='DateBlock' key={props.id}>
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