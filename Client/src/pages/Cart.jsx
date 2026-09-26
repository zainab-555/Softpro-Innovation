import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CART_API, getCart } from "../utils/cart";
import { getImageUrl } from "../utils/media";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadCart = async () => {
    setLoading(true);
    try {
      setItems(await getCart());
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Cart load nahi ho paaya.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCart(); }, []);

  const updateQuantity = async (item, quantity) => {
    if (quantity < 1) return;
    const maxStock = Number(item.product_id?.stock_quantity || 0);
    if (maxStock > 0 && quantity > maxStock) return;
    const response = await axios.put(`${CART_API}/${item._id}`, { quantity });
    setItems((current) => current.map((cartItem) => cartItem._id === item._id ? response.data : cartItem));
    window.dispatchEvent(new CustomEvent("softpro-cart-updated"));
  };

  const removeItem = async (item) => {
    await axios.delete(`${CART_API}/${item._id}`);
    setItems((current) => current.filter((cartItem) => cartItem._id !== item._id));
    window.dispatchEvent(new CustomEvent("softpro-cart-updated"));
  };

  const subtotal = items.reduce((total, item) => total + Number(item.product_id?.price || 0) * item.quantity, 0);
  const totalItems = items.reduce((total, item) => total + Number(item.quantity || 0), 0);
  const delivery = subtotal > 999 || subtotal === 0 ? 0 : 79;

  return (
    <main className="cart-page">
      <div className="container py-5">
        <div className="cart-breadcrumb"><Link to="/Product">Products</Link><i className="bi bi-chevron-right"></i><span>Your Cart</span><strong className="cart-breadcrumb-count">{totalItems} {totalItems === 1 ? "item" : "items"}</strong></div>
        <div className="cart-title-row"><div><span className="cart-eyebrow">READY WHEN YOU ARE</span><h1>Shopping <em>Cart</em></h1><p>Review your components before moving to checkout.</p></div><Link className="cart-continue" to="/Product"><i className="bi bi-arrow-left"></i> Continue shopping</Link></div>
        {loading ? <div className="cart-empty"><i className="bi bi-arrow-repeat"></i><h2>Loading your cart...</h2></div> : error ? <div className="cart-empty"><i className="bi bi-exclamation-circle"></i><h2>{error}</h2></div> : items.length === 0 ? <div className="cart-empty"><i className="bi bi-cart-x"></i><h2>Your cart is waiting for something great.</h2><p>Add a few tested hardware components to get started.</p><Link className="cart-primary-btn" to="/Product">Browse products</Link></div> : <div className="cart-layout"><section className="cart-items-panel"><div className="cart-panel-heading"><h2>Cart items</h2><span>{items.length} products</span></div>{items.map((item) => { const product = item.product_id; return <article className="cart-item" key={item._id}><img src={getImageUrl(product?.images?.[0]) || "/placeholder-product.png"} alt={product?.name || "Product"} /><div className="cart-item-info"><span>{product?.category_id?.name || "Hardware"}</span><h3>{product?.name}</h3><strong>₹{Number(product?.price || 0).toLocaleString("en-IN")}</strong></div><div className="cart-quantity"><button onClick={() => updateQuantity(item, item.quantity - 1)} disabled={item.quantity === 1}>−</button><b>{item.quantity}</b><button onClick={() => updateQuantity(item, item.quantity + 1)}>+</button></div><strong className="cart-item-total">₹{(Number(product?.price || 0) * item.quantity).toLocaleString("en-IN")}</strong><button className="cart-remove" onClick={() => removeItem(item)} aria-label={`Remove ${product?.name}`}><i className="bi bi-trash3"></i></button></article>; })}</section><aside className="cart-summary"><span className="cart-eyebrow">ORDER SUMMARY</span><h2>Complete your order</h2><div><span>Subtotal</span><strong>₹{subtotal.toLocaleString("en-IN")}</strong></div><div><span>Delivery</span><strong>{delivery ? `₹${delivery}` : "FREE"}</strong></div><hr /><div className="cart-total"><span>Total</span><strong>₹{(subtotal + delivery).toLocaleString("en-IN")}</strong></div><button className="cart-primary-btn" onClick={() => navigate("/checkout")}><i className="bi bi-lightning-charge-fill"></i> Buy Now</button><small><i className="bi bi-shield-check"></i> Secure checkout · Free delivery above ₹999</small></aside></div>}
      </div>
    </main>
  );
}
