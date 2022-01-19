import { getMongoRepository, MongoRepository } from "typeorm";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../schemas/User";
import { IUsersRepository } from "./IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: MongoRepository<User>

  constructor() {
    this.repository = getMongoRepository(User)
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password
    })

    await this.repository.save(user)

    return user
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email })
  }

}