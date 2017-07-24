import { DisneyParksCalendar } from '../disney-parks-calendar';

let date0: Date = new Date("2017-07-23 00:00:01");
let date1: Date = new Date("2017-07-24 00:00:01");
let dates: Array<Date> = [date0, date1];
DisneyParksCalendar.getParkHours(...dates).
    toArray().
    subscribe(
        (data) => data.forEach(operatingHours => console.log(operatingHours.toString())), 
        (error) => console.error(error)
    );