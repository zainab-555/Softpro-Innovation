import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart, clearCart } from "../utils/cart";

export default function Checkout() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("Online"); // "Online" or "COD"
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getCart()
      .then(setItems)
      .catch(() => setError("Cart load nahi ho paaya."));
  }, []);

  const subtotal = items.reduce(
    (total, item) => total + Number(item.product_id?.price || 0) * item.quantity,
    0
  );
  const delivery = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const totalAmount = subtotal + delivery;

  // Razorpay Online Payment Flow
  const handleOnlinePayment = async () => {
    if (!window.Razorpay) {
      setError("Razorpay SDK load nahi hua. Kripya page refresh karein.");
      setSubmitting(false);
      return;
    }

    try {
      // 1. Backend se Razorpay Order ID mangwayein
      const orderResponse = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount: totalAmount
      });

      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message || "Order generate nahi ho saka");
      }

      const { order, key_id } = orderResponse.data;

      // 2. Razorpay Checkout modal configure karein
      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: "Softpro Innovation",
        description: `Order Payment (#${order.id})`,
        image: "/favicon.svg",
        order_id: order.id,
        handler: async function (response) {
          try {
            setSubmitting(true);
            // 3. Backend par payment signature verify karein
            const verifyResponse = await axios.post("http://localhost:5000/api/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderData: {
                customer: {
                  name: form.name,
                  email: form.email,
                  phone: form.phone,
                  address: {
                    street: form.street,
                    city: form.city,
                    state: form.state,
                    pincode: form.pincode
                  }
                },
                items: items.map((item) => ({
                  product_id: item.product_id?._id,
                  name: item.product_id?.name,
                  thumbnail: item.product_id?.images?.[0] || "",
                  price: item.product_id?.price,
                  quantity: item.quantity
                })),
                total_amount: totalAmount,
                payment_method: "Online",
                payment_status: "Paid",
                order_status: "Processing"
              }
            });

            if (verifyResponse.data.success) {
              await clearCart();
              navigate("/", { state: { orderPlaced: true, paymentSuccess: true } });
            } else {
              setError("Payment verification fail ho gaya.");
            }
          } catch (verifyError) {
            setError(verifyError.response?.data?.message || "Payment verification error");
          } finally {
            setSubmitting(false);
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone
        },
        theme: {
          color: "#0f8585"
        },
        modal: {
          ondismiss: function () {
            setSubmitting(false);
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on("payment.failed", function (failResponse) {
        setError(failResponse.error?.description || "Payment fail ho gaya. Kripya dobara koshish karein.");
        setSubmitting(false);
      });

      razorpayInstance.open();
    } catch (paymentErr) {
      setError(paymentErr.response?.data?.message || paymentErr.message || "Payment initiate karne me samasya aayi.");
      setSubmitting(false);
    }
  };

  // COD Payment Flow
  const handleCodPayment = async () => {
    try {
      await axios.post("http://localhost:5000/api/order/create", {
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: {
            street: form.street,
            city: form.city,
            state: form.state,
            pincode: form.pincode
          }
        },
        items: items.map((item) => ({
          product_id: item.product_id?._id,
          name: item.product_id?.name,
          thumbnail: item.product_id?.images?.[0] || "",
          price: item.product_id?.price,
          quantity: item.quantity
        })),
        total_amount: totalAmount,
        payment_method: "COD",
        payment_status: "Pending",
        order_status: "Pending"
      });

      await clearCart();
      navigate("/", { state: { orderPlaced: true } });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Order place nahi ho paaya.");
    } finally {
      setSubmitting(false);
    }
  };

  const submitOrder = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    if (paymentMethod === "Online") {
      await handleOnlinePayment();
    } else {
      await handleCodPayment();
    }
  };

  return (
    <main className="checkout-page">
      <div className="container py-5">
        <Link to="/cart" className="checkout-back">
          <i className="bi bi-arrow-left"></i> Back to cart
        </Link>
        <div className="checkout-heading">
          <span>SECURE CHECKOUT</span>
          <h1>
            Complete your <em>order</em>
          </h1>
          <p>Your components are almost on their way.</p>
        </div>

        {error && <div className="checkout-error mb-3">{error}</div>}

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={submitOrder}>
            <h2>Delivery details</h2>
            <div className="checkout-form-grid">
              <input
                required
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                required
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                required
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                required
                placeholder="Pincode"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              />
              <input
                required
                className="checkout-wide"
                placeholder="Street address"
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
              />
              <input
                required
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
              <input
                required
                placeholder="State"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
              />
            </div>

            {/* Payment Method Selector */}
            <div className="checkout-payment-section">
              <h3>Choose Payment Method</h3>
              <div className="payment-methods-grid">
                <label
                  className={`payment-method-card ${paymentMethod === "Online" ? "selected" : ""}`}
                  onClick={() => setPaymentMethod("Online")}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value="Online"
                    checked={paymentMethod === "Online"}
                    onChange={() => setPaymentMethod("Online")}
                  />
                  <div className="payment-method-info">
                    <div className="payment-method-title">
                      <span>Online Payment (UPI, Cards, NetBanking)</span>
                      <span className="payment-badge">Fast & Secure</span>
                    </div>
                    <div className="payment-method-desc">
                      Pay via Google Pay, PhonePe, Paytm, QR code, Debit/Credit Card & Net Banking via Razorpay.
                    </div>
                  </div>
                </label>

                <label
                  className={`payment-method-card ${paymentMethod === "COD" ? "selected" : ""}`}
                  onClick={() => setPaymentMethod("COD")}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                  />
                  <div className="payment-method-info">
                    <div className="payment-method-title">
                      <span>Cash on Delivery (COD)</span>
                    </div>
                    <div className="payment-method-desc">
                      Pay with cash when your package is delivered.
                    </div>
                  </div>
                </label>
              </div>

              <div className="razorpay-trust-badge">
                <i className="bi bi-shield-check"></i>
                <span>Guaranteed safe & secure checkout powered by <strong>Razorpay</strong></span>
              </div>
            </div>

            <button
              type="submit"
              className="checkout-submit"
              disabled={submitting || !items.length}
            >
              {submitting
                ? "Processing..."
                : paymentMethod === "Online"
                ? `Pay ₹${totalAmount.toLocaleString("en-IN")} via Razorpay`
                : "Place Order · Cash on Delivery"}
            </button>
          </form>

          <aside className="checkout-summary">
            <span>ORDER SUMMARY</span>
            <h2>{items.length} items</h2>
            {items.map((item) => (
              <div className="checkout-line" key={item._id}>
                <span>
                  {item.product_id?.name} × {item.quantity}
                </span>
                <strong>
                  ₹{(item.product_id?.price * item.quantity).toLocaleString("en-IN")}
                </strong>
              </div>
            ))}
            <hr />
            <div className="checkout-line">
              <span>Delivery Charges</span>
              <strong>{delivery === 0 ? "FREE" : `₹${delivery}`}</strong>
            </div>
            <div className="checkout-total">
              <span>Total</span>
              <strong>₹{totalAmount.toLocaleString("en-IN")}</strong>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
