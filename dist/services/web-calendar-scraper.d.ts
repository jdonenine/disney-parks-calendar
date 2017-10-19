import { Observable } from 'rxjs/Observable';
import { CalendarAvailability } from '../model/calendar-availability';
import { ParkOperatingHours } from '../model/park-operating-hours';
import { SimpleDate } from '../model/simple-date';
import { CalendarAccess } from './calendar-access.interface';
export declare class WebCalendarScraper implements CalendarAccess {
    isCalendarAvailable(date: SimpleDate): Observable<CalendarAvailability>;
    getOperatingHours(date: SimpleDate): Observable<ParkOperatingHours>;
}
