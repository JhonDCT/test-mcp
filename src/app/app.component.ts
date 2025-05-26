import { Component, OnInit } from '@angular/core';
import { User } from '../modules/user/domain/entity/user.entity';
import { EventBus } from '../modules/user/infrastructure/event-bus';
import { InMemoryBookRepository } from '../modules/user/infrastructure/implementations/in-memory-book.repository';
import { InMemoryUserRepository } from '../modules/user/infrastructure/implementations/in-memory-user.repository';
import { FavoritesService } from '../modules/user/application/service/favorites.service';
import { Book } from '../modules/user/domain/entity/book.entity';
import { BookAddedToFavoritesEvent } from '../modules/user/domain/event/book_added_to_favorites.event';
import { MarkBookAsFavoriteUseCase } from '../modules/user/application/usecase/mark-book-as-favorite.usecase';
import { MangaListComponent } from "./manga-list/manga-list.component";
import { ResponsiveDirective } from './responsive.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MangaListComponent, ResponsiveDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ng-manga-reader';

  eventBus = new EventBus();
  bookRepository = new InMemoryBookRepository();
  userRepository = new InMemoryUserRepository();
  favoritesService = new FavoritesService(this.userRepository, this.bookRepository, this.eventBus);
  markBookAsFavoriteUseCase = new MarkBookAsFavoriteUseCase(this.favoritesService);

  constructor() {
    this.userRepository.save(User.create('1', 'Jhon', 'jhon@gmail.com', 'https://avatars.githubusercontent.com/u/101043?v=4'));
    this.bookRepository.save(new Book('1', 'Jhon'));
    this.bookRepository.save(new Book('2', 'Deyner'));

    this.eventBus.subscribe('BookAddedToFavoritesEvent', (event: BookAddedToFavoritesEvent) => {
      console.log(event.userId, event.bookId);
      this.title = event.userId + ' ' + event.bookId;
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  projectContentChanged(): void {
    console.log('projectContentChanged');
  }

  public onClick(): void {
    this.markBookAsFavoriteUseCase.execute('1', '1');
  }
}
