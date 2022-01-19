import joi from 'joi'
import { IAuthenticateUserDTO } from '../../dtos/IAuthenticateUserDTO'

export const authenticateUserSchema = joi.object<IAuthenticateUserDTO>({
  email: joi.string().email().required(),
  password: joi.string().required()
})