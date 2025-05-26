export class Email {
    constructor(value: string) {
        if (!this.isValid(value)) {
            throw new Error('email is invalid');
        }
    }

    isValid(value: string): boolean {
        if (!value) {
            return false;
        }

        return true;
    }
}