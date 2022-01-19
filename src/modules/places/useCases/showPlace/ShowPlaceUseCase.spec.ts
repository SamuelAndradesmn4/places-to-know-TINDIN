import { AppError } from '../../../../shared/errors/AppError'
import { PlacesRepositoryInMemory } from '../../repositories/PlacesRepositoryInMemory'
import { ShowPlaceUseCase } from './ShowPlaceUseCase'

let placesRepository: PlacesRepositoryInMemory
let showPlace: ShowPlaceUseCase

describe('ShowPlace', () => {
  beforeEach(() => {
    placesRepository = new PlacesRepositoryInMemory()
    showPlace = new ShowPlaceUseCase(placesRepository)
  })

  it('should be able to show a place data', async () => {
    const place1 = await placesRepository.create({
      name: 'place 1',
      photo: 'image1.png'
    })

    await placesRepository.create({
      name: 'place 2',
      photo: 'image2.png'
    })

    const placeData = await showPlace.execute(String(place1.id))

    expect(placeData).toBe(place1)
  })

  it('should not be able to show a non-existent place', async () => {
    await expect(showPlace.execute('non-existent-place-id'))
      .rejects.toBeInstanceOf(AppError)
  })
})