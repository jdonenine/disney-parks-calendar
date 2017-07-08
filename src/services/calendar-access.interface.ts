import { Observable } from 'rxjs/Rx';

import { CalendarAvailability } from '../model/calendar-availability';
import { ParkOperatingHours } from '../model/park-operating-hours';

export interface CalendarAccess {
    isCalendarAvailable(date: Date): Observable<CalendarAvailability>;
    findLastDateAvailableStartingFrom(date: Date): Observable<CalendarAvailability>;
    getOperatingHours(date: Date): Observable<ParkOperatingHours>;
}