import axios from "axios";
import { getGuestCartId } from "./cart";

export const WISHLIST_API = "http://localhost:5000/api/wishlist";

export function getWishlistGuestId() {
  return getGuestCartId();
}

export async function getWishlist() {
  const response = await axios.get(`${WISHLIST_API}/guest/${getWishlistGuestId()}`);
  return response.data;
}

export async function toggleWishlist(productId) {
  const response = await axios.post(`${WISHLIST_API}/toggle`, {
    product_id: productId,
    guest_id: getWishlistGuestId(),
  });
  window.dispatchEvent(new CustomEvent("softpro-wishlist-updated"));
  return response.data;
}
