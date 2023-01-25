export type WorkDay = {
    id: string,
    date: Date,
    shift: string,
    shiftType: string
};

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