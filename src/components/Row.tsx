import React from 'react';
import { Cell } from './Cell'
import { WorkDay } from '../models/WorkDay';

type RowProps = {
   days: WorkDay[]
};

export const Row:React.FC<RowProps> = props => {

    return (
        <ul>
        {
            props.days.map(day => {
                return (
                    <Cell
                        shift = {day.shift}
                        shiftType = {day.shiftType}
                        id = {day.id}
                        key = {day.id}
                    />
                )
            })
        }
        </ul>
    );
};