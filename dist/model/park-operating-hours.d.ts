import { TimeRange } from './time-range';
export declare class ParkOperatingHours {
    parkId: string;
    parkName: string;
    date: Date;
    standardHours: TimeRange;
    magicHours: TimeRange;
}
