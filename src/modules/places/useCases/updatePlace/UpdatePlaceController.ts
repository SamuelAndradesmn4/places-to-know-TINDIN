import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePlaceUseCase } from "./UpdatePlaceUseCase";

export class UpdatePlaceController {
  async hande(request: Request, response: Response) {
    const { id, name } = request.body

    const updatePlace = container.resolve(UpdatePlaceUseCase)

    const place = await updatePlace.execute({
      id,
      name
    })

    return response.json(place)
  }
}