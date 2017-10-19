import { SimpleDate } from './simple-date';

export class CalendarAvailability {
    date: SimpleDate;
    available: boolean;
    constructor(date: SimpleDate, available: boolean) {
        this.date = date;
        this.available = available;
    }
}