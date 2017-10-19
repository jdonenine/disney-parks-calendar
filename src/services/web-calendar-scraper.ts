import { Observable } from 'rxjs/Observable';

import { CalendarAvailability } from '../model/calendar-availability';
import { ParkOperatingHours } from '../model/park-operating-hours';
import { SimpleDate } from '../model/simple-date';
import { CalendarAccess } from './calendar-access.interface';
import { DisneyCalendarScrapperService } from './disney-calendar-scrapper.service';

export class WebCalendarScraper implements CalendarAccess {
    public isCalendarAvailable(date: SimpleDate): Observable<CalendarAvailability> {
        return DisneyCalendarScrapperService.isCalendarAvailable(date);
    }

    public getOperatingHours(date: SimpleDate): Observable<ParkOperatingHours> {
        return DisneyCalendarScrapperService.getOperatingHours(date);
    }
}