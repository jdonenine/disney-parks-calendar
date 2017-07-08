import { Observable } from 'rxjs/Observable';

import { CalendarAvailability } from '../model/calendar-availability';
import { ParkOperatingHours } from '../model/park-operating-hours';
import { CalendarAccess } from './calendar-access.interface';
import { DisneyCalendarScrapperService } from './disney-calendar-scrapper.service';

export class WebCalendarScraper implements CalendarAccess {
    public isCalendarAvailable(date: Date): Observable<CalendarAvailability> {
        return DisneyCalendarScrapperService.isCalendarAvailable(date);
    }

    public findLastDateAvailableStartingFrom(date: Date): Observable<CalendarAvailability> {
        return DisneyCalendarScrapperService.findLastDateAvailableStartingFrom(date);
    }

    public getOperatingHours(date: Date): Observable<ParkOperatingHours> {
        return DisneyCalendarScrapperService.getOperatingHours(date);
    }
}