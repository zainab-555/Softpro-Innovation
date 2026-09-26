import { Link } from 'react-router-dom';

const AboutContent = () => {
  return (
    <>
      {/* Mission + Stats */}
      <section className="mission-section py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-7">
              <span className="section-label-light">OUR MISSION</span>
              <h2 className="mission-heading">
                Building the <span className="text-orangered fst-italic">Future</span> One Kit at a Time
              </h2>
              <p className="mission-text">
                We believe in lowering the barrier to hardware innovation. From a school science project
                to a professional IoT product, we stock everything you need and ship it to your doorstep
                anywhere in India.
              </p>
              <p className="mission-text">
                Our team of engineers hand-picks every product, writes detailed guides, and provides
                real human support — because we are makers ourselves.
              </p>
            </div>
            <div className="col-md-5">
              <div className="row g-3">
                <div className="col-6">
                  <div className="stat-box">
                    <h3>5,000+</h3>
                    <p>Products</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-box">
                    <h3>50K+</h3>
                    <p>Happy Customers</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-box">
                    <h3>7</h3>
                    <p>Years in Business</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-box">
                    <h3>99.8%</h3>
                    <p>Order Accuracy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section py-5">
        <div className="container text-center">
          <span className="section-label-light">WHAT WE STAND FOR</span>
          <h2 className="mission-heading">
            Our Core <span className="text-orangered fst-italic">Values</span>
          </h2>

          <div className="row g-4 mt-4 text-start">
            {[
              { icon: "bi-gem", title: "Curated Quality", text: "Every product is tested and verified by our in-house engineering team before it hits the shelf." },
              { icon: "bi-rocket-takeoff", title: "Fast Fulfillment", text: "Orders placed before 5 PM are dispatched same-day. Most customers receive within 24-48 hours." },
              { icon: "bi-cpu", title: "Genuine Components", text: "We source directly from Raspberry Pi Ltd, Arduino S.r.l, and authorized distributors only." },
              { icon: "bi-headset", title: "Maker Support", text: "Our technical team is available via chat, email, and phone to help debug your projects." },
              { icon: "bi-people", title: "Community First", text: "We sponsor hackathons, college labs, and open-source hardware projects across India." },
              { icon: "bi-lightbulb", title: "Continuous Learning", text: "Free project tutorials, wiring guides, and datasheets ship with every order." },
            ].map((v, i) => (
              <div className="col-md-4" key={i}>
                <div className="value-card h-100">
                  <div className="value-icon text-orangered"><i className={`bi ${v.icon}`}></i></div>
                  <h5 className="fw-bold text-dark">{v.title}</h5>
                  <p className="text-muted small mb-0">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="journey-section py-5">
        <div className="container text-center">
          <span className="section-label-light">HOW WE GOT HERE</span>
          <h2 className="mission-heading mb-5">
            Our <span className="text-orangered fst-italic">Journey</span>
          </h2>

          <div className="timeline">
            {[
              { year: "2018", text: "Founded in a small garage in Lucknow with 200 SKUs and a dream." },
              { year: "2019", text: "Launched online store — 1,000 orders in the first six months." },
              { year: "2021", text: "Reached 10,000 customers and opened our first warehouse." },
              { year: "2023", text: "Became an official Raspberry Pi Approved Reseller for India." },
              { year: "2024", text: "5,000+ products, 50,000+ orders, and growing every day." },
            ].map((t, i) => (
              <div className="timeline-item" key={i}>
                <span className="timeline-year">{t.year}</span>
                <span className="timeline-text">{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section text-center py-5">
        <div className="container">
          <span className="section-label-light">READY TO BUILD?</span>
          <h2 className="mission-heading mb-4">
            Start your next project with <span className="text-orangered fst-italic">SoftproInnovation</span>
          </h2>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/Product" className="btn btn-orangered px-4 py-2 text-decoration-none">
              Shop Now
            </Link>
            <Link to="/Contact" className="btn btn-outline-light-custom px-4 py-2 text-decoration-none">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutContent;