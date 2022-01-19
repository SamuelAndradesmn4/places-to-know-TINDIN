export interface IPhotoProvider {
  getPhotoUrl(search: string): Promise<string>
}