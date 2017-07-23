"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParkOperatingHours = (function () {
    function ParkOperatingHours() {
        this.standardHours = [];
        this.magicHours = [];
    }
    ParkOperatingHours.prototype.toString = function () {
        var ret = 'ParkOperatingHours: ';
        ret += this.parkName + '|';
        ret += this.parkId + '|';
        ret += this.date.format('MM/DD/YYYY') + '|';
        ret += 'standardHours:';
        for (var _i = 0, _a = this.standardHours; _i < _a.length; _i++) {
            var timeRange = _a[_i];
            ret += '[' + timeRange.toString() + ']';
        }
        ret += '|';
        ret += 'magicHours:';
        for (var _b = 0, _c = this.magicHours; _b < _c.length; _b++) {
            var timeRange = _c[_b];
            ret += '[' + timeRange.toString() + ']';
        }
        ret += '|';
        return ret;
    };
    return ParkOperatingHours;
}());
exports.ParkOperatingHours = ParkOperatingHours;
//# sourceMappingURL=park-operating-hours.js.map