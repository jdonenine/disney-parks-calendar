"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimeRange = (function () {
    function TimeRange() {
    }
    TimeRange.prototype.toString = function () {
        var open = 'INVALID';
        var close = 'INVALID';
        if (this.openTime != undefined && this.openTime != null) {
            open = new Date(this.openTime).toLocaleString();
        }
        if (this.closeTime != undefined && this.closeTime != null) {
            close = new Date(this.closeTime).toLocaleString();
        }
        return open + ' - ' + close;
    };
    return TimeRange;
}());
exports.TimeRange = TimeRange;
//# sourceMappingURL=time-range.js.map