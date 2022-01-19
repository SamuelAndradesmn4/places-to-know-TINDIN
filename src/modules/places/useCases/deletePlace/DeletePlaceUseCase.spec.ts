import { AppError } from '../../../../shared/errors/AppError'
import { PlacesRepositoryInMemory } from '../../repositories/PlacesRepositoryInMemory'
import { DeletePlaceUseCase } from './DeletePlaceUseCase'

let placesRepository: PlacesRepositoryInMemory
let deletePlace: DeletePlaceUseCase

describe('DeletePlace', () => {
  beforeEach(() => {
    placesRepository = new PlacesRepositoryInMemory()
    deletePlace = new DeletePlaceUseCase(placesRepository)
  })

  it('should be able to delete a place', async () => {
    const place1 = await placesRepository.create({
      name: 'place1',
      photo: 'photo1.png'
    })

    const place2 = await placesRepository.create({
      name: 'place2',
      photo: 'photo2.png'
    })

    await deletePlace.execute(String(place1.id))

    const places = await placesRepository.findAll()

    expect(places.length).toBe(1)
    expect(places[0]).toBe(place2)
  })

  it('should not be able to delete a non-existent place', async () => {
    await expect(deletePlace.execute('non-existent-place-id'))
      .rejects.toBeInstanceOf(AppError)
  })
})