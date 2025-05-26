import {UserId} from "../value-objects/user-id.value-object";
import {Email} from "../value-objects/email.value-object";

export class User {
  private readonly id: UserId;
  private readonly name: string;
  private readonly email: Email;
  private readonly avatar: string;

  constructor(id: string, name: string, email: string, avatar: string) {
    this.id = new UserId(id);
    this.name = name;
    this.email = new Email(email);
    this.avatar = avatar;
  }

  static create(
    id: string, name: string, email: string, avatar: string,
  ): User {
    return new User(id, name, email, avatar);
  }

  public getId(): UserId {
    return this.id;
  }
}

