export class BookId {
    constructor(private id: string) {
        if (!id) {
            throw new Error("Book ID cannot be empty.");
        }
    }

    public getValue(): string {
        return this.id;
    }
}