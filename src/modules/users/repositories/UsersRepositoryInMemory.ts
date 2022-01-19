import { ObjectId } from 'mongodb'
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../schemas/User";
import { IUsersRepository } from "./IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = []

  async create({ name, email, password}: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, {
      id: ObjectId(),
      name,
      email,
      password
    })

    this.users.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email)
  }

}