import { AppError } from "../../../../shared/errors/AppError";
import { HashProviderInMemory } from "../../providers/HashProvider/in-memory/HashProviderInMemory";
import { UsersRepositoryInMemory } from "../../repositories/UsersRepositoryInMemory";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepository: UsersRepositoryInMemory
let hashProvider: HashProviderInMemory
let authenticateUser: AuthenticateUserUseCase

describe('AuthenticateUser', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    hashProvider = new HashProviderInMemory()
    authenticateUser = new AuthenticateUserUseCase(usersRepository, hashProvider)
  })

  it('should be able to authenticate a user', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password'
    })

    const tokenResponse = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: 'password'
    })

    expect(tokenResponse).toHaveProperty('user')
    expect(tokenResponse.user).toBe(user)
    expect(tokenResponse).toHaveProperty('token')
  })

  it('should not be able to authenticate a non-existent user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'non-existent-email',
        password: 'password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate an user with a wrong password', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password'
    })

    await expect(
      authenticateUser.execute({
        email: user.email,
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})