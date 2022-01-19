import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowPlaceUseCase } from "./ShowPlaceUseCase";

export class ShowPlaceController {
  async handle(request: Request, response: Response) {
    const { placeId } = request.params

    const showPlace = container.resolve(ShowPlaceUseCase)

    const place = await showPlace.execute(placeId)

    return response.json(place)
  }
}