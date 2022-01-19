import { Request, Response } from "express";
import { container } from "tsyringe";
import { IListPlacesDTO } from "../../dtos/IListPlacesDTO";
import { ListPlacesUseCase } from "./ListPlacesUseCase";

export class ListPlacesController {
  async handle(request: Request, response: Response) {
    const { search, order, page, limit }: IListPlacesDTO = request.query

    const listPlaces = container.resolve(ListPlacesUseCase)

    const places = await listPlaces.execute({
      search,
      order,
      page,
      limit
    })

    return response.json(places)
  }
}