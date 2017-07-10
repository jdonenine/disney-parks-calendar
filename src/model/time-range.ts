import { Moment } from "moment/moment";

export class TimeRange {
    openTime: Moment;
    closeTime: Moment;
    toString(): string {
        let open: string = 'INVALID';
        let close: string = 'INVALID';
        if (this.openTime != undefined && this.openTime != null) {
            open = this.openTime.toDate().toLocaleString();
        }
        if (this.closeTime != undefined && this.closeTime != null) {
            close = this.closeTime.toDate().toLocaleString();
        }
        return open + ' - ' + close;
    }
}