import { Observable } from 'rxjs/Rx';
import { CalendarAvailability } from '../model/calendar-availability';
import { ParkOperatingHours } from '../model/park-operating-hours';
import { SimpleDate } from '../model/simple-date';
export interface CalendarAccess {
    isCalendarAvailable(date: SimpleDate): Observable<CalendarAvailability>;
    getOperatingHours(date: SimpleDate): Observable<ParkOperatingHours>;
}
