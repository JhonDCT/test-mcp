import { User } from "../../domain/entity/user.entity";
import { UserId } from "../../domain/value-objects/user-id.value-object";
import { UserRepository } from "../../application/repository/user.repository";

export class InMemoryUserRepository implements UserRepository {
    private users: Map<string, User> = new Map();

    public findById(userId: UserId): User | undefined {
        return this.users.get(userId.getValue());
    }

    public save(user: User): void {
        this.users.set(user.getId().getValue(), user);
    }
}
