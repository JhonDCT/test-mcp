export class BookAddedToFavoritesEvent {
    readonly bookId: string;
    readonly userId: string;

    constructor(bookId: string, userId: string) {
        this.bookId = bookId;
        this.userId = userId;
    }
}