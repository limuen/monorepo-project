import { isHttp } from "../is";

export const resolveStaticUrl = (imagePath: string, baseUrl: string = import.meta.env.VITE_OSS_SERVICE_URL) => {
  return imagePath ? (isHttp(imagePath) ? imagePath : `${baseUrl}/${imagePath}`) : "";
};
