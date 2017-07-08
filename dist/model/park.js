"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParkEnum;
(function (ParkEnum) {
    ParkEnum[ParkEnum["MAGIC_KINGDOM"] = 0] = "MAGIC_KINGDOM";
    ParkEnum[ParkEnum["EPCOT_FUTURE_WORLD"] = 1] = "EPCOT_FUTURE_WORLD";
    ParkEnum[ParkEnum["EPCOT_WORLD_SHOWCASE"] = 2] = "EPCOT_WORLD_SHOWCASE";
    ParkEnum[ParkEnum["HOLLYWOOD_STUDIOS"] = 3] = "HOLLYWOOD_STUDIOS";
    ParkEnum[ParkEnum["ANIMAL_KINGDOM"] = 4] = "ANIMAL_KINGDOM";
    ParkEnum[ParkEnum["TYPHOON_LAGOON"] = 5] = "TYPHOON_LAGOON";
    ParkEnum[ParkEnum["BLIZZARD_BEACH"] = 6] = "BLIZZARD_BEACH";
    ParkEnum[ParkEnum["ESPN_WWS"] = 7] = "ESPN_WWS";
    ParkEnum[ParkEnum["DISNEY_SPRINGS"] = 8] = "DISNEY_SPRINGS";
})(ParkEnum = exports.ParkEnum || (exports.ParkEnum = {}));
var ParkDefinition = (function () {
    function ParkDefinition() {
    }
    return ParkDefinition;
}());
exports.ParkDefinition = ParkDefinition;
var ParkDefintions = [
    {
        id: ParkEnum.MAGIC_KINGDOM,
        name: 'Magic Kingdom',
        parkName: 'Magic Kingdom Park'
    },
    {
        id: ParkEnum.EPCOT_FUTURE_WORLD,
        name: 'Epcot - Future World',
        parkName: 'Epcot - Future World'
    },
    {
        id: ParkEnum.EPCOT_WORLD_SHOWCASE,
        name: 'Epcot - World Showcase',
        parkName: 'Epcot - World Showcase'
    },
    {
        id: ParkEnum.HOLLYWOOD_STUDIOS,
        name: 'Hollywood Studios',
        parkName: 'Disney\'s Hollywood Studios'
    },
    {
        id: ParkEnum.ANIMAL_KINGDOM,
        name: 'Animal Kingdom',
        parkName: 'Disney\'s Animal Kingdom Theme Park'
    },
    {
        id: ParkEnum.TYPHOON_LAGOON,
        name: 'Typhoon Lagoon',
        parkName: 'Disney\'s Typhoon Lagoon Water Park'
    },
    {
        id: ParkEnum.BLIZZARD_BEACH,
        name: 'Blizzard Beach',
        parkName: 'Disney\'s Blizzard Beach Water Park'
    },
    {
        id: ParkEnum.ESPN_WWS,
        name: 'ESPN Wide World of Sports',
        parkName: 'ESPN Wide World of Sports Complex'
    },
    {
        id: ParkEnum.DISNEY_SPRINGS,
        name: 'Disney Springs',
        parkName: 'Disney Springs'
    }
];
var ParkEnumHelper = (function () {
    function ParkEnumHelper() {
    }
    ParkEnumHelper.getAllParkDefinitions = function () {
        return ParkDefintions;
    };
    ParkEnumHelper.getParkDefinition = function (id) {
        var matches = ParkDefintions.filter(function (parkDefinition) { return parkDefinition.id === id; });
        if (!matches || matches.length < 1) {
            return;
        }
        return matches[0];
    };
    ParkEnumHelper.getParkDefinitionByParkName = function (parkName) {
        var matches = ParkDefintions.filter(function (parkDefinition) { return parkDefinition.parkName === parkName; });
        if (!matches || matches.length < 1) {
            return;
        }
        return matches[0];
    };
    return ParkEnumHelper;
}());
exports.ParkEnumHelper = ParkEnumHelper;
//# sourceMappingURL=park.js.map