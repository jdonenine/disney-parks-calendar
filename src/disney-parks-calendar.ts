import { Observable } from 'rxjs/Observable';

import { CalendarAvailability } from './model/calendar-availability';
import { ParkOperatingHours } from './model/park-operating-hours';
import { SimpleDate } from './model/simple-date';
import { CalendarAccess } from './services/calendar-access.interface';
import { WebCalendarScraper } from './services/web-calendar-scraper';

const access: CalendarAccess = new WebCalendarScraper();

export class DisneyParksCalendar {

    static isCalendarAvailable(date: SimpleDate): Observable<CalendarAvailability> {
        return access.isCalendarAvailable(date);
    }

    static getParkHours(...dates: Array<SimpleDate>): Observable<ParkOperatingHours> {
        let responses: Array<Observable<ParkOperatingHours>> = [];
        for (let date of dates) {
            responses.push(access.getOperatingHours(date));
        }
        return Observable.merge(...responses);
    }

}