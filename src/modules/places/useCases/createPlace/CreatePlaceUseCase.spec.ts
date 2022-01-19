import { PhotoProviderInMemory } from '../../providers/PhotoProvider/in-memory/PhotoProviderInMemory'
import { PlacesRepositoryInMemory } from '../../repositories/PlacesRepositoryInMemory'
import { CreatePlaceUseCase } from './CreatePlaceUseCase'

let photoProvider: PhotoProviderInMemory
let placesRepository: PlacesRepositoryInMemory
let createPlace: CreatePlaceUseCase

describe('CreatePlace', () => {
  beforeEach(() => {
    photoProvider = new PhotoProviderInMemory()
    placesRepository = new PlacesRepositoryInMemory()
    createPlace = new CreatePlaceUseCase(photoProvider, placesRepository)
  })

  it('should be able to create a new place', async () => {
    const place = await createPlace.execute({
      name: 'Place Name'
    })

    expect(place).toHaveProperty('id')
    expect(place).toHaveProperty('photo')
  })
})