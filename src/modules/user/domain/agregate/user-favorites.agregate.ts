import { BookAddedToFavoritesEvent } from "../event/book_added_to_favorites.event";
import {UserId} from '../value-objects/user-id.value-object';
import {BookId} from '../value-objects/book-id.value-object';

export class UserFavorites {
    private readonly userId: UserId;
    private readonly favoriteBooks: Set<BookId>;
    private readonly domainEvents: BookAddedToFavoritesEvent[];

    constructor(userId: string) {
        this.userId = new UserId(userId);
        this.favoriteBooks = new Set<BookId>();
        this.domainEvents = [];
    }

    public addBookToFavorites(bookId: BookId): void {
        if (!this.favoriteBooks.has(bookId)) {
            this.favoriteBooks.add(bookId);
            this.registerEvent(new BookAddedToFavoritesEvent(this.userId.getValue(), bookId.getValue()));
        }
    }

    private registerEvent(event: BookAddedToFavoritesEvent): void {
        this.domainEvents.push(event);
    }

    public getDomainEvents(): BookAddedToFavoritesEvent[] {
        return this.domainEvents;
    }
}
