import { ObjectID } from "mongodb";
import { ICreatePlaceDTO } from "../dtos/ICreatePlaceDTO";
import { Place } from "../schemas/Place";
import { IPlacesRepository } from "./IPlacesRepository";

export class PlacesRepositoryInMemory implements IPlacesRepository {
  private places: Place[] = []

  async create({ name, photo }: ICreatePlaceDTO): Promise<Place> {
    const place = new Place()

    Object.assign(place, {
      id: ObjectID(),
      name,
      photo
    })

    this.places.push(place)

    return place
  }

  async findAll(order?: string): Promise<Place[]> {
    if (order && order === 'name') {
      return this.places.sort((a, b) => {
        if (a.name < b.name) { return -1 }
      })
    }

    return this.places
  }

  async findOne(placeId: string): Promise<Place> {
    return this.places.find(place => String(place.id) === placeId)
  }

  async save(place: Place): Promise<Place> {
    const findIndex = this.places.findIndex(
      findPlace => findPlace.id === place.id
    )

    this.places[findIndex] = place

    return this.places[findIndex]
  }

  async delete(placeId: ObjectID): Promise<void> {
    this.places = this.places.filter(place => place.id !== placeId)
  }
  
}