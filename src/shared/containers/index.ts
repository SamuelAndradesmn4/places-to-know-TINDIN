import { container } from 'tsyringe'
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository'
import { UsersRepository } from '../../modules/users/repositories/UsersRepository'

import '../../modules/users/providers'
import '../../modules/places/providers'

import { IPlacesRepository } from '../../modules/places/repositories/IPlacesRepository'
import { PlacesRepository } from '../../modules/places/repositories/PlacesRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<IPlacesRepository>('PlacesRepository', PlacesRepository)