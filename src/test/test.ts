import { DisneyParksCalendar } from '../disney-parks-calendar';

let date0: Date = new Date("2017-07-22 00:00:01");
let dates: Array<Date> = [date0];
DisneyParksCalendar.getParkHours(...dates).
    toArray().
    subscribe(
        (data) => data.forEach(operatingHours => console.log(operatingHours.toString())), 
        (error) => console.error(error)
    );