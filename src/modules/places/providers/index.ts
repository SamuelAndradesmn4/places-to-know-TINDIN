import { container } from "tsyringe";
import { UnsplashPhotoProvider } from "./PhotoProvider/implementations/UnsplashPhotoProvider";
import { IPhotoProvider } from "./PhotoProvider/models/IPhotoProvider";

container.registerSingleton<IPhotoProvider>('PhotoProvider', UnsplashPhotoProvider)