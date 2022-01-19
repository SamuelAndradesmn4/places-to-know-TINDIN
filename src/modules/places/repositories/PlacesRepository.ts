import { getMongoRepository, MongoRepository, ObjectID } from "typeorm";
import { ICreatePlaceDTO } from "../dtos/ICreatePlaceDTO";
import { IListPlacesDTO } from "../dtos/IListPlacesDTO";
import { Place } from "../schemas/Place";
import { IPlacesRepository } from "./IPlacesRepository";

export class PlacesRepository implements IPlacesRepository {
  private repository: MongoRepository<Place>

  constructor() {
    this.repository = getMongoRepository(Place)
  }

  async create({ name, photo }: ICreatePlaceDTO): Promise<Place> {
    const place = this.repository.create({
      name,
      photo
    })

    await this.repository.save(place)

    return place
  }

  async findAll(order?: string): Promise<Place[]> {
    if (order && order === 'name') {
      return await this.repository.find({
        order: {
          name: 'ASC'
        }
      })
    }

    return await this.repository.find()
  }

  async findOne(placeId: string): Promise<Place> {
    return await this.repository.findOne(placeId)
  }

  async save(place: Place): Promise<Place> {
    return await this.repository.save(place)
  }

  async delete(placeId: ObjectID): Promise<void> {
    await this.repository.delete(placeId)
  }
}