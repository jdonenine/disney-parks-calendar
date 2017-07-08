"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var disney_parks_calendar_1 = require("../disney-parks-calendar");
var date07072017 = new Date("2017-07-07 00:00:01");
var date07082017 = new Date("2017-07-08 00:00:01");
var date07092017 = new Date("2017-07-09 00:00:01");
var dates = [date07072017, date07082017, date07092017];
disney_parks_calendar_1.DisneyParksCalendar.getParkHours.apply(disney_parks_calendar_1.DisneyParksCalendar, dates).toArray().
    subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
//# sourceMappingURL=test.js.map