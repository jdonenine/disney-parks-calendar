import { Observable } from 'rxjs/Observable';
import { ParkOperatingHours } from './model/park-operating-hours';
export declare class DisneyParksCalendar {
    static getParkHours(...dates: Array<Date>): Observable<ParkOperatingHours>;
}
