import { TimeRange } from './time-range';
import { Moment } from "moment/moment";
export declare class ParkOperatingHours {
    parkId: string;
    parkName: string;
    date: Moment;
    standardHours: Array<TimeRange>;
    magicHours: Array<TimeRange>;
    toString(): string;
}
