import { SimpleDate } from './simple-date';
import { TimeRange } from './time-range';
export declare class ParkOperatingHours {
    parkId: string;
    parkName: string;
    date: SimpleDate;
    standardHours: Array<TimeRange>;
    magicHours: Array<TimeRange>;
    toString(): string;
}
