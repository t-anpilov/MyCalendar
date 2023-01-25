export type WorkDay = {
    id: string,
    date: Date,
    shift: string,
    shiftType: string
};

type Team = {firstDate: string, lead: string};
type Shift = {text: string,style: string};

export const teams: Team[] = [
    {firstDate: '2020, 6, 8', lead: 'Viacheslav Yuriev'},
    {firstDate: '2020, 6, 11', lead: 'Oleg Melnychuk'},
    {firstDate: '2020, 6, 14', lead: 'Dmytro Kytsiuk'},
    {firstDate: '2020, 6, 17', lead: 'Yevhenii Bozhenko'},
    {firstDate: '2020, 6, 20', lead: 'Maksym Soroka'}
];

export const Shifts =  [
    {   text: 'first shift',
        style: 'work_shift',
    },
    {   text: 'second shift',
        style: 'work_shift'
    },
    {   text: 'night shift',
        style: 'work_shift'
    },
    {   text: 'day off',
        style: 'day_off'
    }
];

function compare(num: number) { 
    let result: Shift | null = null; 
    if (num==14 || num==13 || num==12 || num==8 || num==7 || num==6) {
        result = Shifts[3];
    } else  if (num==11 || num==10 || num==9) {
        result = Shifts[3];
    } else  if (num==5 || num==4 || num==3) {
        result = Shifts[1];
    } else if (num==2 || num===1 || num===0) {
        result = Shifts[0]; 
    } 
    if (result) return result;
}

function compareBack(num: number) { 
    let result: Shift | null = null; 
    if (num==1 || num==2 || num==3 || num==7 || num==8 || num==9) {
        result = Shifts[3];
    } else  if (num==4 || num==5 || num==6) {
        result = Shifts[2];
    } else  if (num==10 || num==11 || num==12) {
        result = Shifts[1];
    } else if (num==13 || num==14 || num===0 || num==15) {
        result = Shifts[0]; 
    }
    if (result !== null) return result;
}

function getShift(initialDate: Date, requiredDate: Date) {
    let date: number = Math.round(+initialDate/86400000);
    let day: number = Math.round(+requiredDate/86400000);
    let someShift: Shift | null = null;   
    let x: number, y: number;
    if (day>=date){
        x = day-date
        if (x>14) {
            y = x%15;
            let result = compare(y);
            if(result) someShift =result;
        } else if (x>0) {
            let result = compare(x);    
            if(result) someShift =result;
        } else if (x===0) {
            someShift = Shifts[0];              
        }
        
    } else if (day<date){
        x = date-day;
        if (x>15) {
            y = x%15;
            let result = compareBack(y);
            if(result) someShift =result;
            
        } else if (x==15) {                
            let result = compareBack(x); 
            if(result) someShift =result;       
        }   
        else if (x) {    
            let result = compareBack(x); 
            if(result) someShift =result;       
        }                
    }    
    if (someShift !== null) return someShift;    
};

function calculateDate(teamNumber: number, day: any) {
    let date1: Date = new Date(teams[teamNumber].firstDate); 
    let date2: Date = day.valueAsDate; 
    let dayType = getShift(date1, date2);       
}



export const workDays: WorkDay[] = 
    [
        {
            id: '001',
            date: new Date(),
            shift: 'first',
            shiftType: ''
        },
        {
            id: '002',
            date: new Date(),
            shift: 'second',
            shiftType: ''
        },
        {
            id: '003',
            date: new Date(),
            shift: 'night',
            shiftType: ''
        },
    ]