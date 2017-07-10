"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimeRange = (function () {
    function TimeRange() {
    }
    TimeRange.prototype.toString = function () {
        var open = 'INVALID';
        var close = 'INVALID';
        if (this.openTime != undefined && this.openTime != null) {
            open = this.openTime.toDate().toLocaleString();
        }
        if (this.closeTime != undefined && this.closeTime != null) {
            close = this.closeTime.toDate().toLocaleString();
        }
        return open + ' - ' + close;
    };
    return TimeRange;
}());
exports.TimeRange = TimeRange;
//# sourceMappingURL=time-range.js.map