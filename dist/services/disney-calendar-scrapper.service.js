"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/combineAll");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/mergeMap");
var cheerio = require("cheerio");
var dateFormat = require("dateformat");
var moment = require("moment-timezone");
var request = require("request");
var Rx_1 = require("rxjs/Rx");
var calendar_availability_1 = require("../model/calendar-availability");
var park_1 = require("../model/park");
var park_2 = require("../model/park");
var park_operating_hours_1 = require("../model/park-operating-hours");
var time_range_1 = require("../model/time-range");
var TIME_RANGE_SEPARATOR = ' – ';
var HOURS_24_MS = 24 * 60 * 60 * 1000;
var DisneyCalendarScrapperService = (function () {
    function DisneyCalendarScrapperService() {
    }
    DisneyCalendarScrapperService.buildURL = function (date) {
        if (!date) {
            throw new Error('Invalid date requested');
        }
        return DisneyCalendarScrapperService.DISNEY_CALENDAR_URL_BASE + dateFormat(date, DisneyCalendarScrapperService.DISNEY_CALENDAR_URL_DATE_FORMAT) + '/';
    };
    DisneyCalendarScrapperService.findLastDateAvailableStartingFrom = function (date) {
        if (date === void 0) { date = new Date(); }
        return DisneyCalendarScrapperService.isCalendarAvailable(date).
            mergeMap(function (availability) {
            if (availability.available) {
                return DisneyCalendarScrapperService.findLastDateAvailableStartingFrom(new Date(availability.date.getTime() + HOURS_24_MS));
            }
            else {
                var lastDate = new Date(availability.date.getTime() - HOURS_24_MS);
                return Rx_1.Observable.of(new calendar_availability_1.CalendarAvailability(lastDate, true));
            }
        });
    };
    DisneyCalendarScrapperService.isCalendarAvailable = function (date) {
        if (!date) {
            return Rx_1.Observable.throw('Invalid date requested');
        }
        var URL = DisneyCalendarScrapperService.buildURL(date);
        return Rx_1.Observable.create(function (observer) {
            request({ url: URL, followRedirect: false }, function (error, response, body) {
                if (error) {
                    observer.error(error);
                }
                else {
                    if (response.statusCode == 302) {
                        observer.next(new calendar_availability_1.CalendarAvailability(date, false));
                    }
                    else {
                        observer.next(new calendar_availability_1.CalendarAvailability(date, true));
                    }
                }
                observer.complete();
            });
        });
    };
    DisneyCalendarScrapperService.getOperatingHours = function (date) {
        if (!date) {
            return Rx_1.Observable.throw('Invalid date requested');
        }
        var URL = DisneyCalendarScrapperService.buildURL(date);
        return Rx_1.Observable.create(function (observer) {
            request(URL, function (error, response, body) {
                if (error) {
                    observer.error(error);
                }
                else {
                    var hoursList = DisneyCalendarScrapperService.processHTML(body, date);
                    for (var _i = 0, hoursList_1 = hoursList; _i < hoursList_1.length; _i++) {
                        var hours = hoursList_1[_i];
                        observer.next(hours);
                    }
                }
                observer.complete();
            });
        });
    };
    DisneyCalendarScrapperService.processHTML = function (body, date) {
        if (!body || body.length < 1) {
            throw new Error('HTML content is not valid.');
        }
        var hoursList = [];
        var $ = cheerio.load(body);
        if (!$) {
            throw new Error('Unable to load HTML content.');
        }
        var parkNameElements = $('div.itineraryParkHoursInformation .body a span.parkName');
        if (!parkNameElements || parkNameElements.length < 1) {
            throw new Error('Unable to locate parkName elements.');
        }
        parkNameElements.each(function (i, element) {
            if (!element || element.children.length != 1) {
                return;
            }
            var parkNameElement = element.children[0];
            if (!parkNameElement || parkNameElement.type != 'text') {
                return;
            }
            var parkName = parkNameElement.nodeValue;
            var parkDef = park_2.ParkEnumHelper.getParkDefinitionByParkName(parkName);
            if (!parkDef) {
                console.error('Unable to map parkName \'' + parkName + '\'');
                return;
            }
            var parkOperatingHours = new park_operating_hours_1.ParkOperatingHours();
            parkOperatingHours.parkId = park_1.ParkEnum[parkDef.id];
            parkOperatingHours.parkName = parkDef.name;
            parkOperatingHours.date = moment(date);
            var nameContainer = element.parent;
            if (!nameContainer) {
                console.error('Unable to step to parent of parkName for park \'' + parkDef.name + '\'');
                hoursList.push(parkOperatingHours);
                return;
            }
            var parkContainer = nameContainer.parent;
            if (!parkContainer) {
                console.error('Unable to step to parent of name for park \'' + parkDef.name + '\'');
                hoursList.push(parkOperatingHours);
                return;
            }
            var parkInfoContainers = parkContainer.children;
            if (!parkInfoContainers) {
                console.error('Unable to step to top level park info container for park \'' + parkDef.name + '\'');
                hoursList.push(parkOperatingHours);
                return;
            }
            var standardHoursContainer;
            var extendedHoursContainer;
            parkInfoContainers.
                filter(function (parkInfoContainer) { return parkInfoContainer; }).
                filter(function (parkInfoContainer) { return parkInfoContainer.type && parkInfoContainer.type == 'tag'; }).
                filter(function (parkInfoContainer) { return parkInfoContainer.attribs && parkInfoContainer.attribs.class; }).
                forEach(function (parkInfoContainer) {
                if (parkInfoContainer.attribs.class == 'hours range') {
                    standardHoursContainer = parkInfoContainer;
                }
                else if (parkInfoContainer.attribs.class == 'magicHours') {
                    extendedHoursContainer = parkInfoContainer;
                }
            });
            var regularHours = DisneyCalendarScrapperService.processHoursContainer(standardHoursContainer, date);
            if (regularHours) {
                parkOperatingHours.standardHours = parkOperatingHours.standardHours.concat(regularHours);
            }
            var magicHours = DisneyCalendarScrapperService.processHoursContainer(extendedHoursContainer, date);
            if (magicHours) {
                parkOperatingHours.magicHours = parkOperatingHours.magicHours.concat(magicHours);
            }
            hoursList.push(parkOperatingHours);
        });
        return hoursList;
    };
    DisneyCalendarScrapperService.processHoursContainer = function (container, date) {
        if (!container || !container.children) {
            return;
        }
        var timeRangeStrings = [];
        container.children.
            filter(function (dataContainer) { return dataContainer; }).
            filter(function (dataContainer) { return dataContainer.type == 'tag'; }).
            filter(function (dataContainer) { return dataContainer.name == 'p'; }).
            filter(function (dataContainer) { return dataContainer.children && dataContainer.children.length > 0; }).
            forEach(function (dataContainer) {
            dataContainer.children.
                filter(function (valueContainer) { return valueContainer; }).
                filter(function (valueContainer) { return valueContainer.type == 'text'; }).
                map(function (valueContainer) { return valueContainer.nodeValue; }).
                forEach(function (value) { return timeRangeStrings.push(value); });
        });
        return DisneyCalendarScrapperService.processTimeRanges(timeRangeStrings, date);
    };
    DisneyCalendarScrapperService.processTimeRanges = function (timeRangeStrings, date) {
        if (!timeRangeStrings || timeRangeStrings.length < 1) {
            return;
        }
        var timeRanges = [];
        for (var _i = 0, timeRangeStrings_1 = timeRangeStrings; _i < timeRangeStrings_1.length; _i++) {
            var timeRangeString = timeRangeStrings_1[_i];
            if (!timeRangeString) {
                continue;
            }
            var timeStrings = timeRangeString.split(TIME_RANGE_SEPARATOR);
            if (!timeStrings || timeStrings.length != 2) {
                console.error('Unable to split time range: ' + timeRangeString);
                continue;
            }
            var startTimeString = timeStrings[0];
            var startTime = moment.parseZone(startTimeString, ["h:mm A"]);
            var endtimeString = timeStrings[1];
            var endTime = moment.parseZone(endtimeString, ["h:mm A"]);
            if (!startTime || !endTime) {
                console.error('Unable to parse time range: ' + timeRangeString);
                continue;
            }
            var modStartDate = moment.tz('America/New_York');
            modStartDate.month(date.getMonth());
            modStartDate.date(date.getDate());
            modStartDate.year(date.getFullYear());
            modStartDate.hours(startTime.hours());
            modStartDate.minutes(startTime.minutes());
            modStartDate.seconds(0);
            var modEndDate = moment.tz('America/New_York');
            modEndDate.month(date.getMonth());
            modEndDate.date(date.getDate());
            modEndDate.year(date.getFullYear());
            modEndDate.hours(endTime.hours());
            modEndDate.minutes(endTime.minutes());
            modEndDate.seconds(0);
            var startAmOrPm = startTime.format("A");
            var endAmOrPm = endTime.format("A");
            if (endAmOrPm.toUpperCase() == 'AM' && startAmOrPm.toUpperCase() == 'PM') {
                modEndDate.add(1, 'd');
            }
            var timeRange = new time_range_1.TimeRange();
            timeRange.openTime = modStartDate;
            timeRange.closeTime = modEndDate;
            timeRanges.push(timeRange);
        }
        return timeRanges;
    };
    return DisneyCalendarScrapperService;
}());
DisneyCalendarScrapperService.DISNEY_CALENDAR_URL_BASE = 'https://disneyworld.disney.go.com/calendars/';
DisneyCalendarScrapperService.DISNEY_CALENDAR_URL_DATE_FORMAT = 'yyyy-mm-dd';
exports.DisneyCalendarScrapperService = DisneyCalendarScrapperService;
//# sourceMappingURL=disney-calendar-scrapper.service.js.map