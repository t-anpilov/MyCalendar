//using class

type Team = {firstDate: string, lead: string};
export type Shift = {
    type: string, 
    style: string, 
    shiftLead?: string, 
    date?: Date,
    id?: string,
    order? : number
};

export interface Shifts {
    initialDate: Date,
    definedShifts: Shift []
}

export class Shifts {

    constructor (initialDate:Date) {
        this.initialDate = initialDate;
        this.definedShifts = [];
    }

    protected teams: Team[] = [
        {firstDate: '2020, 6, 8', lead: 'Viacheslav Yuriev'},
        {firstDate: '2020, 6, 11', lead: 'Oleg Melnychuk'},
        {firstDate: '2020, 6, 14', lead: 'Dmytro Kytsiuk'},
        {firstDate: '2020, 6, 17', lead: 'Yevhenii Bozhenko'},
        {firstDate: '2020, 6, 20', lead: 'Maksym Soroka'}
    ];

    protected shifts: Shift[] =  [
        {type: 'first shift', style: 'work_shift', order: 1},
        {type: 'second shift', style: 'work_shift', order: 2},
        {type: 'night shift', style: 'work_shift', order: 3},
        {type: 'day off', style: 'day_off', order: 4}
    ];

    private compare(num: number) { 
        let result: Shift | null = null; 
        if (num==14 || num==13 || num==12 || num==8 || num==7 || num==6) {
            result = this.shifts[3];
        } else  if (num==11 || num==10 || num==9) {
            result = this.shifts[2];
        } else  if (num==5 || num==4 || num==3) {
            result = this.shifts[1];
        } else if (num==2 || num===1 || num===0) {
            result = this.shifts[0]; 
        } 
        if (result) return result;
    }
    
    private compareBack(num: number) { 
        let result: Shift | null = null; 
        if (num==1 || num==2 || num==3 || num==7 || num==8 || num==9) {
            result = this.shifts[3];
        } else  if (num==4 || num==5 || num==6) {
            result = this.shifts[2];
        } else  if (num==10 || num==11 || num==12) {
            result = this.shifts[1];
        } else if (num==13 || num==14 || num===0 || num==15) {
            result = this.shifts[0]; 
        }
        if (result !== null) return result;
    }
    
    private getShift(initialDate: Date, requiredDate: Date, shiftLead: string) {
        let date: number = Math.round(+initialDate/86400000);
        let day: number = Math.round(+requiredDate/86400000);
        let someShift: Shift | null = null;   
        let x: number, y: number;
        if (day>=date){
            x = day-date
            if (x>14) {
                y = x%15;
                let result = this.compare(y);
                if(result) someShift = {...result} ;
            } else if (x>0) {
                let result = this.compare(x);    
                if(result) someShift = {...result};
            } else if (x===0) {
                someShift = {...this.shifts[0]};              
            }
            
        } else if (day<date){
            x = date-day;
            if (x>15) {
                y = x%15;
                let result = this.compareBack(y);
                if(result) someShift = {...result};
                
            } else if (x==15) {                
                let result = this.compareBack(x); 
                if(result) someShift = {...result};       
            }   
            else if (x) {    
                let result = this.compareBack(x); 
                if(result) someShift = {...result};       
            }                
        }  
        if (someShift !== null) {
            someShift.shiftLead = shiftLead;
            someShift.date = requiredDate;
            someShift.id = (Math.random()*10).toString();
            return someShift;
        }  
        return 
    };
    
    private calculateDate(team: number, day: Date) {
        let shiftLead: string = this.teams[team].lead;
        let date1: Date = new Date(this.teams[team].firstDate); 
        let date2: Date = day; 
        let dayType: Shift | undefined = this.getShift(date1, date2, shiftLead); 
        if (dayType) return dayType ;   
    };

    private sortShifts(unorderedShifts: Shift[]) {
        unorderedShifts.sort((a: Shift, b: Shift) => {
            return a.order! - b.order!
        });
    };
         
    public get calculateShifts() : Shift [] {
        for (let i=0; i<this.teams.length; i++) {
            let newShift = this.calculateDate (i, this.initialDate);
            if (newShift) this.definedShifts[i] = newShift;
        };
        this.sortShifts(this.definedShifts);
        return this.definedShifts;
    }; 
}