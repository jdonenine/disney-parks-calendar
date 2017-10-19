import { Observable } from 'rxjs/Observable';
import { CalendarAvailability } from './model/calendar-availability';
import { ParkOperatingHours } from './model/park-operating-hours';
import { SimpleDate } from './model/simple-date';
export declare class DisneyParksCalendar {
    static isCalendarAvailable(date: SimpleDate): Observable<CalendarAvailability>;
    static getParkHours(...dates: Array<SimpleDate>): Observable<ParkOperatingHours>;
}
