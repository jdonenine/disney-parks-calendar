import { Observable } from 'rxjs/Observable';

import { ParkOperatingHours } from './model/park-operating-hours';
import { CalendarAccess } from './services/calendar-access.interface';
import { WebCalendarScraper } from './services/web-calendar-scraper';

const access: CalendarAccess = new WebCalendarScraper();

export class DisneyParksCalendar {

    static getParkHours(...dates: Array<Date>): Observable<ParkOperatingHours> {
        let responses: Array<Observable<ParkOperatingHours>> = [];
        for (let date of dates) {
            responses.push(access.getOperatingHours(date));
        }
        return Observable.merge(...responses);
    }

}