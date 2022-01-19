import { ObjectID } from 'typeorm'
import { ICreatePlaceDTO } from '../dtos/ICreatePlaceDTO'
import { Place } from '../schemas/Place'

export interface IPlacesRepository {
  create(data: ICreatePlaceDTO): Promise<Place>
  findAll(order?: string): Promise<Place[]>
  findOne(placeId: string): Promise<Place>
  save(place: Place): Promise<Place>
  delete(placeId: ObjectID): Promise<void>
}