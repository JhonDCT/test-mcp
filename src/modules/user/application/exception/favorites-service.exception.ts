export class FavoritesServiceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "FavoritesServiceError";
    }
}