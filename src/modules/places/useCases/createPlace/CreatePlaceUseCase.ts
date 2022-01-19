import { inject, injectable } from "tsyringe";
import { IPhotoProvider } from "../../providers/PhotoProvider/models/IPhotoProvider";
import { IPlacesRepository } from "../../repositories/IPlacesRepository";

interface IRequest {
  name: string
}

@injectable()
export class CreatePlaceUseCase {
  constructor(
    @inject('PhotoProvider')
    private photoProvider: IPhotoProvider,
    @inject('PlacesRepository')
    private placesRepository: IPlacesRepository
  ) {} 

  async execute({ name }: IRequest) {
    const photoUrl = await this.photoProvider.getPhotoUrl(name)

    const place = await this.placesRepository.create({
      name,
      photo: photoUrl
    })

    return place
  }
}