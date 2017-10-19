"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var disney_calendar_scrapper_service_1 = require("./disney-calendar-scrapper.service");
var WebCalendarScraper = (function () {
    function WebCalendarScraper() {
    }
    WebCalendarScraper.prototype.isCalendarAvailable = function (date) {
        return disney_calendar_scrapper_service_1.DisneyCalendarScrapperService.isCalendarAvailable(date);
    };
    WebCalendarScraper.prototype.getOperatingHours = function (date) {
        return disney_calendar_scrapper_service_1.DisneyCalendarScrapperService.getOperatingHours(date);
    };
    return WebCalendarScraper;
}());
exports.WebCalendarScraper = WebCalendarScraper;
//# sourceMappingURL=web-calendar-scraper.js.map