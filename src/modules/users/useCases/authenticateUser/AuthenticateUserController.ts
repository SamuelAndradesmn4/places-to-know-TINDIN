import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";
import validateParams from "../../../../utils/validateParams";
import { IAuthenticateUserDTO } from "../../dtos/IAuthenticateUserDTO";
import { authenticateUserSchema } from "../../schemas/schemasValidation/authenticateUserSchema";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    validateParams<IAuthenticateUserDTO>({ email, password }, authenticateUserSchema)

    const authenticateUser = container.resolve(AuthenticateUserUseCase)

    const { user, token } = await authenticateUser.execute({
      email,
      password
    })

    return response.json({ user: instanceToInstance(user) , token})
  }
}