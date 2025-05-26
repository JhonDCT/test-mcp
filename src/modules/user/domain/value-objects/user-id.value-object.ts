export class UserId {
    constructor(private id: string) {
        if (!id) {
            throw new Error("User ID cannot be empty.");
        }
    }

    public getValue(): string {
        return this.id;
    }
}
