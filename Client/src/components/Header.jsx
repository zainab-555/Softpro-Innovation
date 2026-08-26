import logo from "../assets/logo.png"
import { Link } from "react-router"
const Header = () => {
  return (
    <>
      <div className="container-fluid bg-dark">
        <div className="row">
          <div className="col-sm-12">
            <nav class="navbar navbar-expand-lg bg-light bg-dark">
              <div class="container-fluid">
                <a class="navbar-brand" href="#">
                  <img src={logo} alt="" width="50px" />
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/About" style={{ color: "#e5e5e5" }} >About</a>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link" href="/Product"  style={{ color: "#e5e5e5" }}>Products</a>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link" href="/Contact" style={{ color: "#e5e5e5" }}>Contact</a>
                    </li>
                  </ul>
                  <div className="d-flex gap-2 align-items-center">

                    <button class="btn btn-outline-orangered" type="submit"><i class="bi bi-moon"></i> Dark</button>
                    <button class="btn btn-outline-orangered" type="submit"> <i class="bi bi-cart"></i>Cart</button>
                    <button class="btn btn-outline-orangered" type="submit">Login</button>
                    {/* <button class="btn btn-orangered" type="submit">Register</button> */}
                    <button
                      class="btn btn-orangered"
                      style={{ backgroundColor: "#E05C2A", color: "white", border: "1px solid #E05C2A" }}
                      type="submit"
                    >
                      <Link to="/registering">Register</Link>
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