import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

export const CART_API = `${API_BASE_URL}/api/cart`;

export function getGuestCartId() {
  let cartId = localStorage.getItem("softpro-cart-id");
  if (!cartId) {
    cartId = `guest_${crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(36).slice(2)}`}`;
    localStorage.setItem("softpro-cart-id", cartId);
  }
  return cartId;
}

export async function addToCart(product, quantity = 1) {
  const response = await axios.post(`${CART_API}/add`, {
    product_id: product._id || product.id,
    guest_id: getGuestCartId(),
    quantity,
    status: "active",
  });
  window.dispatchEvent(new CustomEvent("softpro-cart-updated"));
  return response.data;
}

export async function getCart() {
  const response = await axios.get(`${CART_API}/guest/${getGuestCartId()}`);
  return response.data;
}

export async function clearCart() {
  const guestId = getGuestCartId();
  try {
    await axios.delete(`${CART_API}/clear/${guestId}`);
    window.dispatchEvent(new CustomEvent("softpro-cart-updated"));
  } catch (err) {
    console.error("Cart clear error:", err);
  }
}

