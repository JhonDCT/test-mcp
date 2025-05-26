import { UserFavorites } from "../../domain/agregate/user-favorites.agregate";
import { BookId } from "../../domain/value-objects/book-id.value-object";
import { UserId } from "../../domain/value-objects/user-id.value-object";
import { EventBus } from "../../infrastructure/event-bus";
import { BookRepository } from "../repository/book.repository";
import { UserRepository } from "../repository/user.repository";
import { FavoritesServiceError } from "../exception/favorites-service.exception";

export class FavoritesService {
    private bookRepository: BookRepository;
    private userRepository: UserRepository;
    private eventBus: EventBus;

    constructor(userRepository: UserRepository, bookRepository: BookRepository, eventBus: EventBus) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.eventBus = eventBus;
    }

    public markBookAsFavorite(userId: string, bookId: string): void {
        const user = this.userRepository.findById(new UserId(userId));
        const book = this.bookRepository.findById(new BookId(bookId));

        if (!user) {
            throw new FavoritesServiceError("User not found.");
        }

        if (!book) {
            throw new FavoritesServiceError("Book not found.");
        }

        const userFavorites = new UserFavorites(userId);
        userFavorites.addBookToFavorites(new BookId(bookId));

        userFavorites.getDomainEvents().forEach(event => {
            this.eventBus.publish(event);
        });
    }
}
