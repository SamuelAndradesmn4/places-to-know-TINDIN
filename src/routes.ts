import { Router } from "express";
import { placesRoutes } from "./modules/places/routes/places.routes";
import { usersRoutes } from "./modules/users/routes/users.routes";

export const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/places', placesRoutes)