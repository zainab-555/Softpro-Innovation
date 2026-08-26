const testimonials = [
  {
    id: 1,
    text: "Ordered an Arduino starter kit and received it within 24 hours in Lucknow. The quality is excellent and the components are well-labelled. Will definitely order again.",
    name: "Arjun Sharma",
    role: "Engineering Student, IIT Kanpur",
    initials: "AS",
    rating: 5,
  },
  {
    id: 2,
    text: "Best place for Raspberry Pi components in India. The Raspberry Pi 5 kit came with everything I needed and the price is very competitive.",
    name: "Priya Nair",
    role: "IoT Developer, Bangalore",
    initials: "PN",
    rating: 5,
  },
  {
    id: 3,
    text: "Great selection of ESP32 boards and sensors. I have been ordering from Softpro for two years now and the customer support is always helpful.",
    name: "Rahul Mehta",
    role: "Hobbyist Maker",
    initials: "RM",
    rating: 4,
  },
]

const Testimonials = () => {
  return (
    <>
      {/* Testimonials Section */}
      <section className="testimonial-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="category-subtitle">WHAT MAKERS SAY</span>
            <h2 className="category-heading mt-1">
              Loved by the <span className="text-orangered fst-italic">Community</span>
            </h2>
          </div>

          <div className="row g-4">
            {testimonials.map((t) => (
              <div className="col-md-4" key={t.id}>
                <div className="testimonial-card">
                  <div className="quote-icon">"</div>
                  <div className="stars mb-2">
                    {Array(t.rating).fill(0).map((_, i) => (
                      <i className="bi bi-star-fill" key={i}></i>
                    ))}
                  </div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="d-flex align-items-center mt-3">
                    <div className="testimonial-avatar">{t.initials}</div>
                    <div className="ms-2">
                      <h6 className="mb-0 testimonial-name">{t.name}</h6>
                      <small className="testimonial-role">{t.role}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section-wrap py-5">
        <div className="container">
          <div className="newsletter-box d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="mb-4 mb-md-0">
              <h2 className="newsletter-heading">Stay Ahead of the Curve</h2>
              <p className="newsletter-text">
                Get launch alerts, project tutorials, and exclusive deals straight to your inbox.
              </p>
            </div>
            <div className="d-flex newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonials