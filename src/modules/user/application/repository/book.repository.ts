import { Book } from "../../domain/entity/book.entity";
import { BookId } from "../../domain/value-objects/book-id.value-object";

export interface BookRepository {
    findById(bookId: BookId): Book | undefined;
    save(book: Book): void;
}