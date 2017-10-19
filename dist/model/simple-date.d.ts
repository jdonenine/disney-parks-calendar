export declare class SimpleDate {
    year: number;
    month: number;
    date: number;
    constructor(year?: number, month?: number, date?: number);
    isValid(): boolean;
    toString(): string;
    static parse(formatedDate: string): SimpleDate;
}
