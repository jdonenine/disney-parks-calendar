import { SimpleDate } from './simple-date';
import { TimeRange } from './time-range';

export class ParkOperatingHours {
    parkId: string;
    parkName: string;
    date: SimpleDate;
    standardHours: Array<TimeRange> = [];
    magicHours: Array<TimeRange> = [];

    toString(): string {
        let ret: string = 'ParkOperatingHours: ';
        ret += this.parkName + '|';
        ret += this.parkId + '|';
        ret += this.date.toString() + '|';
        ret += 'standardHours:';
        for (let timeRange of this.standardHours) {
            ret += '[' + timeRange.toString() + ']';
        }
        ret += '|';
        ret += 'magicHours:';
        for (let timeRange of this.magicHours) {
            ret += '[' + timeRange.toString() + ']';
        }
        ret += '|';
        return ret;
    }
}