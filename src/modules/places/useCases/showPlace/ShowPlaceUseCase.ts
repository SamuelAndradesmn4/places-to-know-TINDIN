import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IPlacesRepository } from "../../repositories/IPlacesRepository";

@injectable()
export class ShowPlaceUseCase {
  constructor(
    @inject('PlacesRepository')
    private placesRepository: IPlacesRepository
  ) {}

  async execute(placeId: string) {
    const place = await this.placesRepository.findOne(placeId)

    if (!place) {
      throw new AppError('No place found for this placeId', 404)
    }

    return place
  }
}