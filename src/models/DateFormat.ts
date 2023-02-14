export interface DateFormat {
    date: Date,
    dateShownElements: string[],
    weekDay: string,
    options: object
}

export class DateFormat {

    constructor (date: Date) {
        this.date = date;
        this. dateShownElements = [];
        this.weekDay = '';
        this.options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
    }

    private getDateElements () { 
        let dateComponents = this.date.toLocaleString('en-US', this.options).split(', ');        
        let dateLine = dateComponents.slice(1).join(', ');
        let dayLine = dateComponents[0];
        this.dateShownElements.push(dateLine);
        this.dateShownElements.push(dayLine);
    };

    public get getFormatedDate() {
        this.getDateElements();
        return this.dateShownElements;
    };

    public get checkIfWeekend() {
        if (this.date.getDay() > 0 && this.date.getDay() < 6) {
            return false;
        };
        return true;
    };
};