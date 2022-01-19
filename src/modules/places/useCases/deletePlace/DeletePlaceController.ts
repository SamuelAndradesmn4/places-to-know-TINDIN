import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePlaceUseCase } from "./DeletePlaceUseCase";

export class DeletePlaceController {
  async handle(request: Request, response: Response) {
    const { placeId } = request.params

    const deletePlace = container.resolve(DeletePlaceUseCase)

    await deletePlace.execute(placeId)

    return response.send()
  }
}