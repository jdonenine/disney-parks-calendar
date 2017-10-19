import 'rxjs/add/operator/combineAll';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Rx';
import { CalendarAvailability } from '../model/calendar-availability';
import { ParkOperatingHours } from '../model/park-operating-hours';
import { SimpleDate } from '../model/simple-date';
export declare class DisneyCalendarScrapperService {
    private static readonly DISNEY_CALENDAR_URL_BASE;
    private static readonly DISNEY_CALENDAR_URL_DATE_FORMAT;
    static buildURL(date: SimpleDate): string;
    static isCalendarAvailable(date: SimpleDate): Observable<CalendarAvailability>;
    static getOperatingHours(date: SimpleDate): Observable<ParkOperatingHours>;
    private static processHTML(body, date);
    private static processHoursContainer(container, date);
    private static processTimeRanges(timeRangeStrings, date);
}
