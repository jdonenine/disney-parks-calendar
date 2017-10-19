"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var disney_parks_calendar_1 = require("../disney-parks-calendar");
var simple_date_1 = require("../model/simple-date");
var simpleDateStr1 = "2017-01-23";
var simpleDateStr2 = "2017-10-18";
var simpleDateStr3 = "2018-06-04";
disney_parks_calendar_1.DisneyParksCalendar.isCalendarAvailable(simple_date_1.SimpleDate.parse(simpleDateStr1)).
    subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
disney_parks_calendar_1.DisneyParksCalendar.isCalendarAvailable(simple_date_1.SimpleDate.parse(simpleDateStr2)).
    subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
disney_parks_calendar_1.DisneyParksCalendar.isCalendarAvailable(simple_date_1.SimpleDate.parse(simpleDateStr3)).
    subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
var dates1 = [simple_date_1.SimpleDate.parse(simpleDateStr1), simple_date_1.SimpleDate.parse(simpleDateStr2), simple_date_1.SimpleDate.parse(simpleDateStr3)];
disney_parks_calendar_1.DisneyParksCalendar.getParkHours.apply(disney_parks_calendar_1.DisneyParksCalendar, dates1).toArray().
    subscribe(function (data) { return data.forEach(function (operatingHours) { return console.log(operatingHours ? operatingHours.toString() : "No data available"); }); }, function (error) { return console.error(error); });
//# sourceMappingURL=test.js.map