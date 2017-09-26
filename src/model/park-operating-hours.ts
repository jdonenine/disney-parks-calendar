import { TimeRange } from './time-range';
import moment = require('moment-timezone');
import { Moment } from 'moment/moment';

export class ParkOperatingHours {
    parkId: string;
    parkName: string;
    _date: Moment;
    standardHours: Array<TimeRange> = [];
    magicHours: Array<TimeRange> = [];

    get date(): Moment {
        return this._date;
    }

    set date(date: Moment) {
        this._date = date;
        if (!this._date) return;
        this._date.tz("America/New_York");
    }

    toString(): string {
        let ret: string = 'ParkOperatingHours: ';
        ret += this.parkName + '|';
        ret += this.parkId + '|';
        ret += this.date.format('MM/DD/YYYY') + '|';
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