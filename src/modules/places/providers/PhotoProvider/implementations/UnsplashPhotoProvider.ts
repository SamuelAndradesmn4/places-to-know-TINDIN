import { unsplashApi } from "../../../../../services/unsplashApi";
import { AppError } from "../../../../../shared/errors/AppError";
import { IPhotoProvider } from "../models/IPhotoProvider";

export class UnsplashPhotoProvider implements IPhotoProvider {
  async getPhotoUrl(search: string): Promise<string> {

    try {
      const photos = await unsplashApi.get(`/search/photos?query=${search}&page=1&per_page=1`)

      if(photos.data.total === 0) {
        throw new AppError('No photo found for this search', 404)
      }

      const photoLink = photos.data.results[0].urls.full

      return photoLink

    } catch (err) {
      throw new AppError(err.message)
    }
  }
}