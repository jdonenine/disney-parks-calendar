import 'rxjs/add/operator/combineAll';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Rx';
import { CalendarAvailability } from '../model/calendar-availability';
import { ParkOperatingHours } from '../model/park-operating-hours';
export declare class DisneyCalendarScrapperService {
    private static readonly DISNEY_CALENDAR_URL_BASE;
    private static readonly DISNEY_CALENDAR_URL_DATE_FORMAT;
    static buildURL(date: Date): string;
    static findLastDateAvailableStartingFrom(date?: Date): Observable<CalendarAvailability>;
    static isCalendarAvailable(date: Date): Observable<CalendarAvailability>;
    static getOperatingHours(date: Date): Observable<ParkOperatingHours>;
    private static processHTML(body, date);
    private static processHoursContainer(container, date);
    private static processTimeRanges(timeRangeStrings, date);
}
