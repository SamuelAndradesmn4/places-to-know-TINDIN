import { AppError } from '../../../../shared/errors/AppError'
import { PhotoProviderInMemory } from '../../providers/PhotoProvider/in-memory/PhotoProviderInMemory'
import { PlacesRepositoryInMemory } from '../../repositories/PlacesRepositoryInMemory'
import { UpdatePlaceUseCase } from './UpdatePlaceUseCase'

let photoProvider: PhotoProviderInMemory
let placesRepository: PlacesRepositoryInMemory
let updatePlace: UpdatePlaceUseCase

describe('UpdatePlace', () => {
  beforeEach(() => {
    photoProvider = new PhotoProviderInMemory()
    placesRepository = new PlacesRepositoryInMemory()
    updatePlace = new UpdatePlaceUseCase(placesRepository, photoProvider)
  })

  it('should be able to update just place name', async () => {
    const place = await placesRepository.create({
      name: 'place1',
      photo: 'photo1.png'
    })

    await updatePlace.execute({
      id: String(place.id),
      name: 'place1 2'
    })

    expect(place.name).toBe('place1 2')
    expect(place.photo).toBe('photo1.png')
  })

  it('should be able to update place name and photo', async () => {
    const place = await placesRepository.create({
      name: 'place1',
      photo: 'photo1.png'
    })

    const updatedPlace = await updatePlace.execute({
      id: String(place.id),
      name: 'place2'
    })

    expect(place.name).toBe('place2')
    expect(place.photo).toBe(updatedPlace.photo)
  })

  it('should not be able to update a non-existent place', async () => {
    await expect(updatePlace.execute({
      id: 'non-existent-place-id',
      name: 'place'
    })).rejects.toBeInstanceOf(AppError)
  })
})