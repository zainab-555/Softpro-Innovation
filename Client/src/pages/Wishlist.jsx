import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../utils/cart";
import { getImageUrl } from "../utils/media";
import { getWishlist, WISHLIST_API } from "../utils/wishlist";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadWishlist = async () => {
    setLoading(true);
    try { setItems(await getWishlist()); } catch { setMessage("Wishlist load nahi ho paayi."); } finally { setLoading(false); }
  };

  useEffect(() => { loadWishlist(); }, []);

  const removeItem = async (item) => {
    await axios.delete(`${WISHLIST_API}/${item._id}`);
    setItems((current) => current.filter((entry) => entry._id !== item._id));
    window.dispatchEvent(new CustomEvent("softpro-wishlist-updated"));
  };

  const moveToCart = async (item) => {
    await addToCart(item.product_id, 1);
    await removeItem(item);
  };

  return <main className="wishlist-page"><div className="container py-5"><div className="wishlist-heading"><div><span>YOUR SAVED PICKS</span><h1>My <em>Wishlist</em></h1><p>Keep your favorite hardware ready for your next build.</p></div><Link to="/Product" className="wishlist-continue"><i className="bi bi-arrow-left"></i> Continue shopping</Link></div>{loading ? <div className="wishlist-empty"><i className="bi bi-arrow-repeat"></i><h2>Loading wishlist...</h2></div> : message ? <div className="wishlist-empty"><i className="bi bi-exclamation-circle"></i><h2>{message}</h2></div> : items.length === 0 ? <div className="wishlist-empty"><i className="bi bi-heart"></i><h2>Your wishlist is empty.</h2><p>Save products you want to compare or buy later.</p><Link className="wishlist-primary-btn" to="/Product">Explore products</Link></div> : <section className="wishlist-grid">{items.map((item) => { const product = item.product_id; return <article className="wishlist-card" key={item._id}><img src={getImageUrl(product?.images?.[0]) || "/placeholder-product.png"} alt={product?.name || "Product"} /><div className="wishlist-card-info"><span>{product?.category_id?.name || "Hardware"}</span><h2>{product?.name}</h2><strong>₹{Number(product?.price || 0).toLocaleString("en-IN")}</strong><div><button className="wishlist-cart-btn" onClick={() => moveToCart(item)}><i className="bi bi-cart-plus"></i> Move to cart</button><button className="wishlist-remove-btn" onClick={() => removeItem(item)} aria-label="Remove from wishlist"><i className="bi bi-trash3"></i></button></div></div></article>; })}</section>}</div></main>;
}
