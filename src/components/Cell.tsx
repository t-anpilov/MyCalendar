import React from 'react';

type CellProps = {
    shift: string;
    shiftType: string;
    id: string;
}

const cellStyles: string[] = ['vacation', 'sickLeave', 'changeShift']

export const Cell:React.FC<CellProps> = props => {

    let visualStyle: string = '';
    let innerText: string = ''

    switch (props.shiftType) {
        case 'vacation': 
            visualStyle = cellStyles[0];
            break;
        case 'sickLeave': 
            visualStyle = cellStyles[1];
            break;
        case 'change': 
            visualStyle = cellStyles[2];
            break;
    }

    switch (props.shift) {
        case 'first': 
            innerText = '1';
            break;
        case 'second': 
            innerText = '2';
            break;
        case 'night': 
            innerText = '3';
            break;
    }


    return (
      <li key={props.id} className={`${visualStyle} Cell`}>
        {innerText}
      </li>
    );
}