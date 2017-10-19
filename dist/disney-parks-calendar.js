"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var web_calendar_scraper_1 = require("./services/web-calendar-scraper");
var access = new web_calendar_scraper_1.WebCalendarScraper();
var DisneyParksCalendar = (function () {
    function DisneyParksCalendar() {
    }
    DisneyParksCalendar.isCalendarAvailable = function (date) {
        return access.isCalendarAvailable(date);
    };
    DisneyParksCalendar.getParkHours = function () {
        var dates = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            dates[_i] = arguments[_i];
        }
        var responses = [];
        for (var _a = 0, dates_1 = dates; _a < dates_1.length; _a++) {
            var date = dates_1[_a];
            responses.push(access.getOperatingHours(date));
        }
        return Observable_1.Observable.merge.apply(Observable_1.Observable, responses);
    };
    return DisneyParksCalendar;
}());
exports.DisneyParksCalendar = DisneyParksCalendar;
//# sourceMappingURL=disney-parks-calendar.js.map