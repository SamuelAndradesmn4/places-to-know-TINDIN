import { inject, injectable } from "tsyringe";
import { IListPlacesDTO } from "../../dtos/IListPlacesDTO";
import { IPlacesRepository } from "../../repositories/IPlacesRepository";

@injectable()
export class ListPlacesUseCase {
  constructor(
    @inject('PlacesRepository')
    private placesRepository: IPlacesRepository
  ) {}

  async execute({ search, order, page, limit}: IListPlacesDTO) {
    const places = await this.placesRepository.findAll(order)

    let filteredPlaces = places
    
    if (search) {
      filteredPlaces = places.map(place => {
        const placeName = place.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        const formattedSearch = search.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  
        if (placeName.indexOf(formattedSearch) !== -1) {
          return place
        } 
      }).filter(Boolean)
    }

    let paginatedPlaces = null

    if (page) {
      if (!limit) {
        limit = 10
      }

      const pageStart = (page - 1) * limit
      const pageEnd = pageStart + limit

      paginatedPlaces = filteredPlaces.slice(pageStart, pageEnd)
    }

    return paginatedPlaces || filteredPlaces
  }
}