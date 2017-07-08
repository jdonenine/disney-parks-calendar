export enum ParkEnum {
    MAGIC_KINGDOM,
    EPCOT_FUTURE_WORLD,
    EPCOT_WORLD_SHOWCASE,
    HOLLYWOOD_STUDIOS,
    ANIMAL_KINGDOM,
    TYPHOON_LAGOON,
    BLIZZARD_BEACH,
    ESPN_WWS,
    DISNEY_SPRINGS
}

export class ParkDefinition {
    id: ParkEnum;
    name: string;
    parkName: string;
}

const ParkDefintions: Array<ParkDefinition> = [
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
]

export class ParkEnumHelper {
    static getAllParkDefinitions(): Array<ParkDefinition> {
        return ParkDefintions;
    }

    static getParkDefinition(id: ParkEnum) {
        let matches: Array<ParkDefinition> = ParkDefintions.filter(parkDefinition => parkDefinition.id === id);
        if (!matches || matches.length < 1) {
            return;
        }
        return matches[0];
    }

    static getParkDefinitionByParkName(parkName: string) {
        let matches: Array<ParkDefinition> = ParkDefintions.filter(parkDefinition => parkDefinition.parkName === parkName);
        if (!matches || matches.length < 1) {
            return;
        }
        return matches[0];
    }
}