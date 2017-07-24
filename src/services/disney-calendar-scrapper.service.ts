import 'rxjs/add/operator/combineAll';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';

import cheerio = require('cheerio');
import dateFormat = require('dateformat');
import moment = require('moment-timezone');
import { Moment } from 'moment/moment';
import request = require('request');
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Rx';

import { CalendarAvailability } from '../model/calendar-availability';
import { ParkEnum } from '../model/park';
import { ParkDefinition, ParkEnumHelper } from '../model/park';
import { ParkOperatingHours } from '../model/park-operating-hours';
import { TimeRange } from '../model/time-range';

const TIME_RANGE_SEPARATOR: string = ' – ';
const HOURS_24_MS: number = 24 * 60 * 60 * 1000;

export class DisneyCalendarScrapperService {
    private static readonly DISNEY_CALENDAR_URL_BASE: string = 'https://disneyworld.disney.go.com/calendars/';
    private static readonly DISNEY_CALENDAR_URL_DATE_FORMAT: string = 'yyyy-mm-dd';

    static buildURL(date: Date): string {
        if (!date) {
            throw new Error('Invalid date requested');
        }
        return DisneyCalendarScrapperService.DISNEY_CALENDAR_URL_BASE + dateFormat(date, DisneyCalendarScrapperService.DISNEY_CALENDAR_URL_DATE_FORMAT) + '/';
    }

    static findLastDateAvailableStartingFrom(date: Date = new Date()): Observable<CalendarAvailability> {
        return DisneyCalendarScrapperService.isCalendarAvailable(date).
            mergeMap(availability => {
                if (availability.available) {
                    return DisneyCalendarScrapperService.findLastDateAvailableStartingFrom(new Date(availability.date.getTime() + HOURS_24_MS));
                } else {
                    let lastDate = new Date(availability.date.getTime() - HOURS_24_MS);
                    return Observable.of(new CalendarAvailability(lastDate, true));
                }
            });
    }

    static isCalendarAvailable(date: Date): Observable<CalendarAvailability> {
        if (!date) {
            return Observable.throw('Invalid date requested') as Observable<CalendarAvailability>;
        }
        let URL: string = DisneyCalendarScrapperService.buildURL(date);
        return Observable.create((observer: Observer<CalendarAvailability>) => {
            request({url: URL, followRedirect: false}, (error, response, body) => {
                if (error) {
                    observer.error(error);
                } else {
                    if (response.statusCode == 302) {
                        observer.next(new CalendarAvailability(date, false));
                    } else {
                        observer.next(new CalendarAvailability(date, true));
                    }
                }
                observer.complete();
            });
        })
    }

    static getOperatingHours(date: Date): Observable<ParkOperatingHours> {
        if (!date) {
            return Observable.throw('Invalid date requested') as Observable<ParkOperatingHours>;
        }
        let URL: string = DisneyCalendarScrapperService.buildURL(date);
        return Observable.create((observer: Observer<ParkOperatingHours>) => {
            request({url: URL, followRedirect: false}, (error, response, body) => {
                if (error) {
                    observer.error(error);
                } else {
                    if (response.statusCode != 302) {
                        let hoursList: Array<ParkOperatingHours> = DisneyCalendarScrapperService.processHTML(body, date);
                        for (let hours of hoursList) {
                            observer.next(hours);
                        }
                    }
                }
                observer.complete();
            });
        })
    }  

    private static processHTML(body: string, date: Date): Array<ParkOperatingHours> {
        if (!body || body.length < 1) {
            throw new Error('HTML content is not valid.');
        }
        let hoursList: Array<ParkOperatingHours> = [];
        const $ = cheerio.load(body);
        if (!$) {
            throw new Error('Unable to load HTML content.');
        }
        let parkNameElements = $('div.itineraryParkHoursInformation .body a span.parkName');
        if (!parkNameElements || parkNameElements.length < 1) {
            throw new Error('Unable to locate parkName elements.');
        }

        parkNameElements.each((i, element) => {
            if (!element || element.children.length != 1) {
                return;
            }
            let parkNameElement: CheerioElement = element.children[0];
            if (!parkNameElement || parkNameElement.type != 'text') {
                return;
            }
            let parkName: string = parkNameElement.nodeValue;
            let parkDef: ParkDefinition | undefined = ParkEnumHelper.getParkDefinitionByParkName(parkName);
            if (!parkDef) {
                console.error('Unable to map parkName \'' + parkName + '\'');
                return;
            }
            let parkOperatingHours: ParkOperatingHours = new ParkOperatingHours();
            parkOperatingHours.parkId = ParkEnum[parkDef.id];
            parkOperatingHours.parkName = parkDef.name;
            parkOperatingHours.date = moment(date);

            let nameContainer: CheerioElement = element.parent;
            if (!nameContainer) {
                console.error('Unable to step to parent of parkName for park \'' + parkDef.name + '\'');
                hoursList.push(parkOperatingHours);
                return;
            }
            let parkContainer: CheerioElement = nameContainer.parent;
            if (!parkContainer) {
                console.error('Unable to step to parent of name for park \'' + parkDef.name + '\'');
                hoursList.push(parkOperatingHours);
                return;
            }
            let parkInfoContainers: CheerioElement[] = parkContainer.children;
            if (!parkInfoContainers) {
                console.error('Unable to step to top level park info container for park \'' + parkDef.name + '\'');
                hoursList.push(parkOperatingHours);
                return;
            }

            let standardHoursContainer: CheerioElement;
            let extendedHoursContainer: CheerioElement;
            parkInfoContainers.
                filter(parkInfoContainer => parkInfoContainer).
                filter(parkInfoContainer => parkInfoContainer.type && parkInfoContainer.type == 'tag').
                filter(parkInfoContainer => parkInfoContainer.attribs && parkInfoContainer.attribs.class).
                forEach(parkInfoContainer => {
                    if (parkInfoContainer.attribs.class == 'hours range') {
                        standardHoursContainer = parkInfoContainer;
                    } else if (parkInfoContainer.attribs.class == 'magicHours') {
                        extendedHoursContainer = parkInfoContainer;
                    }
                })
            let regularHours: Array<TimeRange> = DisneyCalendarScrapperService.processHoursContainer(standardHoursContainer, date);
            if (regularHours) {
                parkOperatingHours.standardHours = parkOperatingHours.standardHours.concat(regularHours);
            }
            let magicHours: Array<TimeRange> = DisneyCalendarScrapperService.processHoursContainer(extendedHoursContainer, date);
            if (magicHours) {
                parkOperatingHours.magicHours = parkOperatingHours.magicHours.concat(magicHours);
            }
            hoursList.push(parkOperatingHours);
        })
        return hoursList;
    }

    private static processHoursContainer(container: CheerioElement, date: Date): Array<TimeRange> {
        if (!container || !container.children) {
            return;
        }
        let timeRangeStrings: Array<string> = [];
        container.children.
                filter(dataContainer => dataContainer).
                filter(dataContainer => dataContainer.type == 'tag').
                filter(dataContainer => dataContainer.name == 'p').
                filter(dataContainer => dataContainer.children && dataContainer.children.length > 0).
                forEach(dataContainer => {
                        dataContainer.children.
                            filter(valueContainer => valueContainer).
                            filter(valueContainer => valueContainer.type == 'text').
                            map(valueContainer => valueContainer.nodeValue).
                            forEach(value => timeRangeStrings.push(value))
                })
        return DisneyCalendarScrapperService.processTimeRanges(timeRangeStrings, date);
    }

    private static processTimeRanges(timeRangeStrings: Array<string>, date: Date): Array<TimeRange> {
        if (!timeRangeStrings || timeRangeStrings.length < 1) {
            return;
        }
        let timeRanges: Array<TimeRange> = [];
        for (let timeRangeString of timeRangeStrings) {
            if (!timeRangeString) {
                continue;
            }
            let timeStrings: Array<string> = timeRangeString.split(TIME_RANGE_SEPARATOR);
            if (!timeStrings || timeStrings.length != 2) {
                console.error('Unable to split time range: ' + timeRangeString);
                continue;
            }
            let startTimeString: string = timeStrings[0];
            let startTime: Moment = moment.parseZone(startTimeString, ["h:mm A"]);
            let endtimeString: string = timeStrings[1];
            let endTime: Moment = moment.parseZone(endtimeString, ["h:mm A"]);
            if (!startTime || !endTime) {
                console.error('Unable to parse time range: ' + timeRangeString);
                continue;
            }
            let modStartDate:Moment = moment.tz('America/New_York');
            modStartDate.month(date.getMonth());
            modStartDate.date(date.getDate());
            modStartDate.year(date.getFullYear());
            modStartDate.hours(startTime.hours());
            modStartDate.minutes(startTime.minutes());
            modStartDate.seconds(0);
            let modEndDate:Moment = moment.tz('America/New_York');
            modEndDate.month(date.getMonth());
            modEndDate.date(date.getDate());
            modEndDate.year(date.getFullYear());
            modEndDate.hours(endTime.hours());
            modEndDate.minutes(endTime.minutes());
            modEndDate.seconds(0);
            let startAmOrPm = startTime.format("A");
            let endAmOrPm = endTime.format("A");
            if (endAmOrPm.toUpperCase() == 'AM' && startAmOrPm.toUpperCase() == 'PM') {
                modEndDate.add(1, 'd');
            }
            let timeRange: TimeRange = new TimeRange();
            timeRange.openTime = modStartDate;
            timeRange.closeTime = modEndDate;
            timeRanges.push(timeRange);
        }
        return timeRanges;
    }
}