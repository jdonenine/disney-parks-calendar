"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var INVALID_DATE = "Invalid";
var DATE_EXP = /^(\d+)\-(\d+)\-(\d+)$/;
var SimpleDate = (function () {
    function SimpleDate(year, month, date) {
        if (year === void 0) { year = 2017; }
        if (month === void 0) { month = 1; }
        if (date === void 0) { date = 1; }
        this.year = year;
        this.month = month;
        this.date = date;
    }
    SimpleDate.prototype.isValid = function () {
        var validDate = this.date && this.date >= 1 && this.date <= 31;
        var validMonth = this.month && this.month >= 1 && this.month <= 12;
        var validYear = this.year && this.year >= 2017 && this.year <= 2018;
        return validDate && validMonth && validYear;
    };
    SimpleDate.prototype.toString = function () {
        if (!this.isValid())
            return INVALID_DATE;
        return this.year + "-" + (this.month < 10 ? ("0" + this.month) : this.month) + "-" + (this.date < 10 ? ("0" + this.date) : this.date);
    };
    SimpleDate.parse = function (formatedDate) {
        if (!formatedDate)
            return;
        var match = DATE_EXP.exec(formatedDate.trim());
        if (!match || match.length < 4)
            return;
        return new SimpleDate(+match[1], +match[2], +match[3]);
    };
    return SimpleDate;
}());
exports.SimpleDate = SimpleDate;
//# sourceMappingURL=simple-date.js.map