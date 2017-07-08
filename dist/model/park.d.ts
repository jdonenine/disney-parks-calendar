export declare enum ParkEnum {
    MAGIC_KINGDOM = 0,
    EPCOT_FUTURE_WORLD = 1,
    EPCOT_WORLD_SHOWCASE = 2,
    HOLLYWOOD_STUDIOS = 3,
    ANIMAL_KINGDOM = 4,
    TYPHOON_LAGOON = 5,
    BLIZZARD_BEACH = 6,
    ESPN_WWS = 7,
    DISNEY_SPRINGS = 8,
}
export declare class ParkDefinition {
    id: ParkEnum;
    name: string;
    parkName: string;
}
export declare class ParkEnumHelper {
    static getAllParkDefinitions(): Array<ParkDefinition>;
    static getParkDefinition(id: ParkEnum): ParkDefinition;
    static getParkDefinitionByParkName(parkName: string): ParkDefinition;
}
