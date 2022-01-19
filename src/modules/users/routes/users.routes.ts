import { Router } from "express";
import { AuthenticateUserController } from "../useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../useCases/createUser/CreateUserController";

export const usersRoutes = Router()

usersRoutes.post('/create', new CreateUserController().handle)
usersRoutes.post('/', new AuthenticateUserController().handle)