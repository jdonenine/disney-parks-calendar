import { DisneyParksCalendar } from '../disney-parks-calendar';

let date07072017: Date = new Date("2017-07-07 00:00:01");
let date07082017: Date = new Date("2017-07-08 00:00:01");
let date07092017: Date = new Date("2017-07-09 00:00:01");
let dates: Array<Date> = [date07072017, date07082017, date07092017];
DisneyParksCalendar.getParkHours(...dates).
    toArray().
    subscribe(
        (data) => console.log(data),
        (error) => console.error(error)
    );