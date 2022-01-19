import { PlacesRepositoryInMemory } from '../../repositories/PlacesRepositoryInMemory'
import { ListPlacesUseCase } from './ListPlacesUseCase'

let placesRepository: PlacesRepositoryInMemory
let listPlaces: ListPlacesUseCase

describe('ListPlaces', () => {
  beforeEach(() => {
    placesRepository = new PlacesRepositoryInMemory()
    listPlaces = new ListPlacesUseCase(placesRepository)
  })

  it('should be able to list all places registered', async () => {
    const place1 = await placesRepository.create({
      name: 'place 1',
      photo: 'image.png'
    })

    const place2 = await placesRepository.create({
      name: 'place 2',
      photo: 'image2.png'
    })

    const places = await listPlaces.execute({})

    expect(places.length).toBe(2)
    expect(places[0]).toBe(place1)
    expect(places[1]).toBe(place2)
  })

  it('should be able to list all places registered with filters', async () => {
    await placesRepository.create({
      name: 'place 1',
      photo: 'image.png'
    })

    const place2 = await placesRepository.create({
      name: 'place 2',
      photo: 'image2.png'
    })

    const places = await listPlaces.execute({
      search: 'place 2'
    })

    expect(places.length).toBe(1)
    expect(places[0]).toBe(place2)
  })

  it('should be able to list all places registered from page 3', async () => {
    await placesRepository.create({
      name: 'place 1',
      photo: 'image.png'
    })

    await placesRepository.create({
      name: 'place 2',
      photo: 'image2.png'
    })

    const place3 = await placesRepository.create({
      name: 'place 3',
      photo: 'image2.png'
    })

    const places = await listPlaces.execute({
      page: 3,
      limit: 1
    })

    expect(places.length).toBe(1)
    expect(places[0]).toBe(place3)
  })
})