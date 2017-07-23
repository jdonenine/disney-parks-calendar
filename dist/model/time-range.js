"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimeRange = (function () {
    function TimeRange() {
    }
    TimeRange.prototype.toString = function () {
        var open = 'INVALID';
        var close = 'INVALID';
        if (this.openTime != undefined && this.openTime != null) {
            open = this.openTime.format('MM/DD/YYYY hh:mm a z');
        }
        if (this.closeTime != undefined && this.closeTime != null) {
            close = this.closeTime.format('MM/DD/YYYY hh:mm a z');
        }
        return open + ' -> ' + close;
    };
    return TimeRange;
}());
exports.TimeRange = TimeRange;
//# sourceMappingURL=time-range.js.map