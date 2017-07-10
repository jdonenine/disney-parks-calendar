import { TimeRange } from './time-range';
import { Moment } from "moment/moment";

export class ParkOperatingHours {
    parkId: string;
    parkName: string;
    date: Moment;
    standardHours: TimeRange;
    magicHours: TimeRange;
}