export class Validator {
    static isPositiveNum(value: number) {
        if (value < 0) {
            throw new Error("value < 0");
        }
    }
}