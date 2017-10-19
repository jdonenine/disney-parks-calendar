const INVALID_DATE: string = "Invalid";
const DATE_EXP: RegExp = /^(\d+)\-(\d+)\-(\d+)$/;

export class SimpleDate {
    constructor(public year: number = 2017, public month: number = 1, public date: number = 1){}
    
    isValid(): boolean {
        const validDate: boolean = this.date && this.date >= 1 && this.date <= 31;
        const validMonth: boolean = this.month && this.month >= 1 && this.month <= 12;
        const validYear: boolean = this.year && this.year >= 2017 && this.year <= 2018;
        return validDate && validMonth && validYear;
    }

    toString(): string {
        if (!this.isValid()) return INVALID_DATE;
        return this.year + "-" + (this.month < 10 ? ("0" + this.month) : this.month) + "-" + (this.date < 10 ? ("0" + this.date) : this.date);
    }

    static parse(formatedDate: string): SimpleDate {
        if (!formatedDate) return;
        const match: RegExpExecArray = DATE_EXP.exec(formatedDate.trim());
        if (!match || match.length < 4) return;
        return new SimpleDate(+match[1], +match[2], +match[3]);
    }
}