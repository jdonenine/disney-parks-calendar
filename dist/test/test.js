"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var disney_parks_calendar_1 = require("../disney-parks-calendar");
var date0 = new Date("2017-07-04 00:00:01");
var dates = [date0];
disney_parks_calendar_1.DisneyParksCalendar.getParkHours.apply(disney_parks_calendar_1.DisneyParksCalendar, dates).toArray().
    subscribe(function (data) { return data.forEach(function (operatingHours) { return console.log(operatingHours.toString()); }); }, function (error) { return console.error(error); });
//# sourceMappingURL=test.js.map