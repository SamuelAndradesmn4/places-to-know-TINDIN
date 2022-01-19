import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUpdatePlaceDTO } from "../../dtos/IUpdatePlaceDTO";
import { IPhotoProvider } from "../../providers/PhotoProvider/models/IPhotoProvider";
import { IPlacesRepository } from "../../repositories/IPlacesRepository";

@injectable()
export class UpdatePlaceUseCase {
  constructor(
    @inject('PlacesRepository')
    private placesRepository: IPlacesRepository,
    @inject('PhotoProvider')
    private photoProvider: IPhotoProvider
  ) {}

  async execute({ id, name }: IUpdatePlaceDTO) {
    const place = await this.placesRepository.findOne(id)

    if (!place) {
      throw new AppError('You cannot update a non-existent place', 404)
    }

    if (!name.toLowerCase().includes(place.name.toLowerCase())) {
      const photoUrl = await this.photoProvider.getPhotoUrl(name)
      place.photo = photoUrl
    }

    place.name = name

    await this.placesRepository.save(place)

    return place
  }
}