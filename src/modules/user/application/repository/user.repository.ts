import { User } from "../../domain/entity/user.entity";
import { UserId } from "../../domain/value-objects/user-id.value-object";

export interface UserRepository {
    findById(userId: UserId): User | undefined;
    save(user: User): void;
}