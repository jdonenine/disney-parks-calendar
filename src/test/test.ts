import { DisneyParksCalendar } from '../disney-parks-calendar';
import { SimpleDate } from '../model/simple-date';

const simpleDateStr1: string = "2017-01-23";
const simpleDateStr2: string = "2017-10-18";
const simpleDateStr3: string = "2018-06-04";
DisneyParksCalendar.isCalendarAvailable(SimpleDate.parse(simpleDateStr1)).
    subscribe(
        (data) => console.log(data),
        (error) => console.error(error)
    );
DisneyParksCalendar.isCalendarAvailable(SimpleDate.parse(simpleDateStr2)).
    subscribe(
        (data) => console.log(data),
        (error) => console.error(error)
    );
DisneyParksCalendar.isCalendarAvailable(SimpleDate.parse(simpleDateStr3)).
    subscribe(
        (data) => console.log(data),
        (error) => console.error(error)
    );
const dates1: Array<SimpleDate> = [SimpleDate.parse(simpleDateStr1), SimpleDate.parse(simpleDateStr2), SimpleDate.parse(simpleDateStr3)];
DisneyParksCalendar.getParkHours(...dates1).
    toArray().
    subscribe(
        (data) => data.forEach(operatingHours => console.log(operatingHours ? operatingHours.toString(): "No data available")), 
        (error) => console.error(error)
    );