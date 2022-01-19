import { ObjectID } from "mongodb";
import { IPhotoProvider } from "../models/IPhotoProvider";

export class PhotoProviderInMemory implements IPhotoProvider {
  async getPhotoUrl(search: string): Promise<string> {
    return `https://images_api/${search}-${ObjectID()}.png`
  }
}