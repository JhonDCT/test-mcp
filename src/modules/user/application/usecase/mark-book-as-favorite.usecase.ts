import { FavoritesServiceError } from "../exception/favorites-service.exception";
import { FavoritesService } from "../service/favorites.service";

export class MarkBookAsFavoriteUseCase {
    private readonly favoritesService: FavoritesService;

    constructor(favoritesService: FavoritesService) {
        this.favoritesService = favoritesService;
    }

    public execute(userId: string, bookId: string): void {
        try {
            this.favoritesService.markBookAsFavorite(userId, bookId);
        } catch (error) {
            if (error instanceof FavoritesServiceError) {
                console.log("FavoritesServiceError: " + error.message);
            } else {
                console.log("Unknown error");
            }
        }
    }
}
