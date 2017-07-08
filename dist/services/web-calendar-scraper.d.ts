import { Observable } from 'rxjs/Observable';
import { CalendarAvailability } from '../model/calendar-availability';
import { ParkOperatingHours } from '../model/park-operating-hours';
import { CalendarAccess } from './calendar-access.interface';
export declare class WebCalendarScraper implements CalendarAccess {
    isCalendarAvailable(date: Date): Observable<CalendarAvailability>;
    findLastDateAvailableStartingFrom(date: Date): Observable<CalendarAvailability>;
    getOperatingHours(date: Date): Observable<ParkOperatingHours>;
}
