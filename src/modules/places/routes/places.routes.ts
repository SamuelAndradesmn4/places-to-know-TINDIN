import { Router } from 'express'
import { ensureAuthenticated } from '../../../shared/middlewares/ensureAuthenticated'
import { CreatePlaceController } from '../useCases/createPlace/CreatePlaceController'
import { DeletePlaceController } from '../useCases/deletePlace/DeletePlaceController'
import { ListPlacesController } from '../useCases/listPlaces/ListPlacesController'
import { ShowPlaceController } from '../useCases/showPlace/ShowPlaceController'
import { UpdatePlaceController } from '../useCases/updatePlace/UpdatePlaceController'

export const placesRoutes = Router()

placesRoutes.use(ensureAuthenticated)

placesRoutes.get('/:placeId', new ShowPlaceController().handle)
placesRoutes.delete('/:placeId', new DeletePlaceController().handle)

placesRoutes.post('/', new CreatePlaceController().handle)
placesRoutes.get('/', new ListPlacesController().handle)
placesRoutes.put('/', new UpdatePlaceController().hande)