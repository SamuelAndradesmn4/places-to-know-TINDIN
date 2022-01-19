import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePlaceUseCase } from "./CreatePlaceUseCase";

export class CreatePlaceController {
  async handle(request: Request, response: Response) {
    const { name } = request.body

    const createPlace = container.resolve(CreatePlaceUseCase)

    const placeImageLink = await createPlace.execute({ name })

    return response.status(201).json(placeImageLink)
  }
}