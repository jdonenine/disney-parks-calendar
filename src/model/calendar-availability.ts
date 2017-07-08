export class CalendarAvailability {
    date: Date;
    available: boolean;
    constructor(date: Date, available: boolean) {
        this.date = date;
        this.available = available;
    }
}