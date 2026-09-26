import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/logo1.png"
import { CART_API, getGuestCartId } from "../utils/cart"
import { getWishlist } from "../utils/wishlist"
const Header = () => {
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)

  useEffect(() => {
    const loadCartCount = () => axios.get(`${CART_API}/guest/${getGuestCartId()}`).then(({ data }) => {
      setCartCount(data.reduce((total, item) => total + item.quantity, 0))
    }).catch(() => setCartCount(0))
    loadCartCount()
    window.addEventListener("softpro-cart-updated", loadCartCount)
    return () => window.removeEventListener("softpro-cart-updated", loadCartCount)
  }, [])

  useEffect(() => {
    const loadWishlistCount = () => getWishlist().then((items) => setWishlistCount(items.length)).catch(() => setWishlistCount(0))
    loadWishlistCount()
    window.addEventListener("softpro-wishlist-updated", loadWishlistCount)
    return () => window.removeEventListener("softpro-wishlist-updated", loadWishlistCount)
  }, [])

  return (
    <>
      <div className="container-fluid site-header">
        <div className="row">
          <div className="col-sm-12">
            <nav className="navbar navbar-expand-lg site-navbar">
              <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                  <img src={logo} alt="Softpro" className="site-logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/About" style={{ color: "#e5e5e5" }} >About</Link>
                    </li>
                    <li className="nav-item dropdown">
                      <Link className="nav-link" to="/Product" style={{ color: "#e5e5e5" }}>Products</Link>
                    </li>
                    <li className="nav-item dropdown">
                      <Link className="nav-link" to="/Contact" style={{ color: "#e5e5e5" }}>Contact</Link>
                    </li>
                  </ul>
                  <div className="d-flex gap-2 align-items-center">

                    <Link className="btn btn-outline-orangered position-relative navbar-icon-btn" to="/wishlist" title="Wishlist" aria-label="Wishlist"><i className="bi bi-heart"></i>{wishlistCount > 0 && <span className="cart-count-badge">{wishlistCount}</span>}</Link>
                    <Link className="btn btn-outline-orangered position-relative" to="/cart"> <i className="bi bi-cart"></i> Cart {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}</Link>
                    <Link className="btn btn-outline-orangered" to="/adminLogin">Login</Link>
                    {/* <button class="btn btn-orangered" type="submit">Register</button> */}
                    <button
                      className="btn btn-orangered"
                      style={{ backgroundColor: "#E05C2A", color: "white", border: "1px solid #E05C2A" }}
                      type="submit"
                    >
                      <Link to="/Registering">Register</Link>
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header