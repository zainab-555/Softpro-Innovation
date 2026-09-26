import { API_BASE_URL } from "./apiConfig";

export const API_ORIGIN = API_BASE_URL;

export const getImageUrl = (image, folder = "products") => {
  if (!image) return "";
  if (/^https?:\/\//i.test(image)) return image;
  if (image.startsWith("/uploads/")) return `${API_ORIGIN}${image}`;
  return `${API_ORIGIN}/uploads/${folder}/${encodeURIComponent(image)}`;
};