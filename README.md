# disney-parks-calendar
A package for extracting and summarizing Disney theme park operating hours

Provides a simple Observable based API for automatically extracting information from Disney's park operating hours calendars.  Current version extracts data from Disney via scrapping their publically available calendars.

The following parks are covered by the library:
* Magic Kingdom
* Epcot (Future World + World Showcase)
* Animal Kingdom
* Hollywood Studios
* Blizzard Beach
* Typhoon Lagoon
* Disney Springs
* ESPN Wide World of Sports

Both "standard" and "extra magic" hours are provided.

## Example Usage
```typescript
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
```

```javascript
var disneyParksCalendar = require("disney-parks-calendar")
var date07072017 = new Date("2017-07-07 00:00:01");
var date07082017 = new Date("2017-07-08 00:00:01");
var date07092017 = new Date("2017-07-09 00:00:01");
var dates = [date07072017, date07082017, date07092017];
disneyParksCalendar.DisneyParksCalendar.getParkHours(...dates).
    toArray().
    subscribe(
        (data) => console.log(data),
        (error) => console.error(error)
    );
```

Response:

```
[
    ParkOperatingHours   {
        parkId:'MAGIC_KINGDOM',
        parkName:'Magic Kingdom',
        date:2017-07-09T04:00:01.000Z,
        standardHours:[
            TimeRange {
                openTime:1499605200000,
                closeTime:1499652000000
            }
        ]
    }
]
```
