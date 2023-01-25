export type WorkDay = {
    id: string,
    date: Date,
    shift: string,
    shiftType: string
};

type Team = {firstDate: string, lead: string};
export type Shift = {type: string, style: string, shiftLead?: string, date?: Date};

export const teams: Team[] = [
    {firstDate: '2020, 6, 8', lead: 'Viacheslav Yuriev'},
    {firstDate: '2020, 6, 11', lead: 'Oleg Melnychuk'},
    {firstDate: '2020, 6, 14', lead: 'Dmytro Kytsiuk'},
    {firstDate: '2020, 6, 17', lead: 'Yevhenii Bozhenko'},
    {firstDate: '2020, 6, 20', lead: 'Maksym Soroka'}
];

const shifts: Shift[] =  [
    {   type: 'first shift',
        style: 'work_shift',
    },
    {   type: 'second shift',
        style: 'work_shift'
    },
    {   type: 'night shift',
        style: 'work_shift'
    },
    {   type: 'day off',
        style: 'day_off'
    }
];

function compare(num: number) { 
    let result: Shift | null = null; 
    if (num==14 || num==13 || num==12 || num==8 || num==7 || num==6) {
        result = shifts[3];
    } else  if (num==11 || num==10 || num==9) {
        result = shifts[3];
    } else  if (num==5 || num==4 || num==3) {
        result = shifts[1];
    } else if (num==2 || num===1 || num===0) {
        result = shifts[0]; 
    } 
    if (result) return result;
}

function compareBack(num: number) { 
    let result: Shift | null = null; 
    if (num==1 || num==2 || num==3 || num==7 || num==8 || num==9) {
        result = shifts[3];
    } else  if (num==4 || num==5 || num==6) {
        result = shifts[2];
    } else  if (num==10 || num==11 || num==12) {
        result = shifts[1];
    } else if (num==13 || num==14 || num===0 || num==15) {
        result = shifts[0]; 
    }
    if (result !== null) return result;
}

function getShift(initialDate: Date, requiredDate: Date, shiftLead: string) {
    let date: number = Math.round(+initialDate/86400000);
    let day: number = Math.round(+requiredDate/86400000);
    let someShift: Shift | null = null;   
    let x: number, y: number;
    if (day>=date){
        x = day-date
        if (x>14) {
            y = x%15;
            let result = compare(y);
            if(result) someShift = {...result} ;
        } else if (x>0) {
            let result = compare(x);    
            if(result) someShift = {...result};
        } else if (x===0) {
            someShift = {...shifts[0]};              
        }
        
    } else if (day<date){
        x = date-day;
        if (x>15) {
            y = x%15;
            let result = compareBack(y);
            if(result) someShift = {...result};
            
        } else if (x==15) {                
            let result = compareBack(x); 
            if(result) someShift = {...result};       
        }   
        else if (x) {    
            let result = compareBack(x); 
            if(result) someShift = {...result};       
        }                
    }  
    if (someShift !== null) {
        someShift.shiftLead = shiftLead;
        someShift.date = requiredDate;
        return someShift;
    }  
    return 
};

function calculateDate(team: number, day: any) {
    let shiftLead: string = teams[team].lead;
    let date1: Date = new Date(teams[team].firstDate); 
    let date2: Date = new Date (day); 
    let dayType: Shift | undefined = getShift(date1, date2, shiftLead); 
    if (dayType) return dayType ;   
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

    console.log (calculateDate (0, '2023-01-25'))