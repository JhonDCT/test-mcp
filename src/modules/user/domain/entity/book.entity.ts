import { BookId } from "../value-objects/book-id.value-object";

export class Book {
    id: BookId;
    name: string;

    constructor(id: string, name: string) {
        this.id = new BookId(id);
        this.name = name;
    }

    public getId(): BookId {
        return this.id;
    }
}