import { isHttp } from "../is";

export const resolveStaticUrl = (imagePath: string) => {
  return imagePath ? (isHttp(imagePath) ? imagePath : `${import.meta.env.VITE_OSS_SERVICE_URL}/${imagePath}`) : "";
};
