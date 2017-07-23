import { Moment } from "moment/moment";

export class TimeRange {
    openTime: Moment;
    closeTime: Moment;
    toString(): string {
        let open: string = 'INVALID';
        let close: string = 'INVALID';
        if (this.openTime != undefined && this.openTime != null) {
            open = this.openTime.format('MM/DD/YYYY hh:mm a z');
        }
        if (this.closeTime != undefined && this.closeTime != null) {
            close = this.closeTime.format('MM/DD/YYYY hh:mm a z');
        }
        return open + ' -> ' + close;
    }
}