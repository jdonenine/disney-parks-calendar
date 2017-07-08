export class TimeRange {
    openTime: number;
    closeTime: number;
    toString(): string {
        let open: string = 'INVALID';
        let close: string = 'INVALID';
        if (this.openTime != undefined && this.openTime != null) {
            open = new Date(this.openTime).toLocaleString();
        }
        if (this.closeTime != undefined && this.closeTime != null) {
            close = new Date(this.closeTime).toLocaleString();
        }
        return open + ' - ' + close;
    }
}