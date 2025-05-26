import { Book } from "../../domain/entity/book.entity";
import { BookId } from "../../domain/value-objects/book-id.value-object";
import { BookRepository } from "../../application/repository/book.repository";

export class InMemoryBookRepository implements BookRepository {
    private books: Map<string, Book> = new Map();

    public findById(bookId: BookId): Book | undefined {
        return this.books.get(bookId.getValue());
    }

    public save(book: Book): void {
        this.books.set(book.getId().getValue(), book);
    }
}
