import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IPlacesRepository } from "../../repositories/IPlacesRepository";

@injectable()
export class DeletePlaceUseCase {
  constructor(
    @inject('PlacesRepository')
    private placesRepository: IPlacesRepository
  ) {}

  async execute(placeId: string) {
    const place = await this.placesRepository.findOne(placeId)

    if (!place) {
      throw new AppError('You cannot delete a non-existent place', 404)
    }

    await this.placesRepository.delete(place.id)
  }
}