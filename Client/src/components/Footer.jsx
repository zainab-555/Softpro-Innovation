const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container py-5">
        <div className="row g-4">

          {/* About */}
          <div className="col-md-3">
            <h5 className="footer-logo mb-3">
              Softpro<span className="text-orangered">Innovation</span>
            </h5>
            <p className="footer-text">
              Your trusted source for microcontrollers, single-board computers, and electronics components in India.
            </p>
            <div className="d-flex gap-2 mt-3">
              <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
              <a href="#" className="social-icon"><i className="bi bi-twitter"></i></a>
              <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
              <a href="#" className="social-icon"><i className="bi bi-youtube"></i></a>
              <a href="#" className="social-icon"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-2">
            <h6 className="footer-heading">QUICK LINKS</h6>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-6 col-md-2">
            <h6 className="footer-heading">CATEGORIES</h6>
            <ul className="footer-links">
              <li><a href="#">Raspberry Pi</a></li>
              <li><a href="#">Arduino</a></li>
              <li><a href="#">ESP32 / ESP8266</a></li>
              <li><a href="#">Sensors</a></li>
              <li><a href="#">Displays</a></li>
              <li><a href="#">Power Modules</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-6 col-md-2">
            <h6 className="footer-heading">SUPPORT</h6>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Track Order</a></li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div className="col-6 col-md-3">
            <h6 className="footer-heading">GET IN TOUCH</h6>
            <div className="footer-contact-item">
              <i className="bi bi-geo-alt-fill"></i>
              <p>
                Softpro House<br/>
                3/213, Sec-J, Jankipuram, Kursi Road<br/>
                Near Gudamba Police Station<br/>
                Lucknow - 226021
              </p>
            </div>
            <div className="footer-contact-item">
              <i className="bi bi-telephone-fill"></i>
              <p>+91 78301 98385</p>
            </div>
            <div className="footer-contact-item">
              <i className="bi bi-envelope-fill"></i>
              <p>pushkar.softpro@gmail.com</p>
            </div>
            <div className="footer-contact-item">
              <i className="bi bi-clock-fill"></i>
              <p>Mon – Sat: 10:00 AM – 7:00 PM</p>
            </div>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center py-3">
          <p className="mb-0">© 2026 SoftproInnovation. All rights reserved.</p>
          <p className="mb-0">Design & Development by Softpro India Computer Technology Pvt. Ltd</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer