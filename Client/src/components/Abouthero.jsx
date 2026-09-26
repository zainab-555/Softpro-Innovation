import { Link } from 'react-router-dom';

const AboutHero = () => {
  return (
    <div
      className="about-hero-section position-relative overflow-hidden py-5"
      style={{
        background: 'linear-gradient(135deg, #0e0a1f 0%, #1a1233 45%, #24143a 100%)',
        color: '#ffffff',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Background Decorative Ambient Radial Glows */}
      <div
        className="position-absolute"
        style={{
          top: '-20%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(224, 92, 42, 0.18) 0%, rgba(224, 92, 42, 0.03) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      ></div>

      <div
        className="position-absolute"
        style={{
          bottom: '-25%',
          left: '-10%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 65%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      ></div>

      <div className="container position-relative py-lg-4" style={{ zIndex: 2 }}>
        <div className="row align-items-center g-5">
          {/* Left Text Column */}
          <div className="col-lg-7">
            <span
              className="badge px-3 py-2 rounded-pill mb-3"
              style={{
                background: 'rgba(224, 92, 42, 0.15)',
                color: '#E05C2A',
                border: '1px solid rgba(224, 92, 42, 0.35)',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Our Story
            </span>

            <h1
              className="mb-3 fw-bold"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                lineHeight: '1.15',
                color: '#ffffff',
                letterSpacing: '-0.5px',
              }}
            >
              Empowering{' '}
              <span style={{ color: '#E05C2A', fontStyle: 'italic' }}>Makers</span>
              <br />
              Across India
            </h1>

            <p
              className="mb-4"
              style={{
                fontSize: '1.05rem',
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: '1.7',
                maxWidth: '620px',
              }}
            >
              SoftproInnovation started with a simple belief: every engineer, student, and hobbyist deserves access to quality electronics components at fair prices, with support that actually helps them build.
            </p>

            <div className="d-flex gap-3 flex-wrap align-items-center">
              <Link
                to="/Product"
                className="btn text-white px-4 py-3 fw-semibold shadow-sm d-inline-flex align-items-center gap-2 text-decoration-none"
                style={{
                  background: '#E05C2A',
                  borderRadius: '10px',
                  fontSize: '15px',
                  boxShadow: '0 8px 24px rgba(224, 92, 42, 0.35)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(224, 92, 42, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(224, 92, 42, 0.35)';
                }}
              >
                <span>Browse Products</span>
                <i className="bi bi-arrow-right"></i>
              </Link>

              <Link
                to="/Contact"
                className="btn text-white px-4 py-3 fw-semibold d-inline-flex align-items-center gap-2 text-decoration-none"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1.5px solid rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  fontSize: '15px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>Get in Touch</span>
                <i className="bi bi-chat-dots"></i>
              </Link>
            </div>
          </div>

          {/* Right Visual / Highlights Column */}
          <div className="col-lg-5">
            <div
              className="p-4 p-md-5 rounded-4 position-relative"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
              }}
            >
              <div className="d-flex flex-column gap-3">
                <div
                  className="d-flex align-items-center gap-3 p-3 rounded-3"
                  style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: 'rgba(224, 92, 42, 0.18)',
                      color: '#E05C2A',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '20px',
                    }}
                  >
                    <i className="bi bi-cpu-fill"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-white" style={{ fontSize: '15px' }}>
                      Genuine Hardware Modules
                    </h6>
                    <small className="text-light opacity-75" style={{ fontSize: '12px' }}>
                      Displays, OLEDs, sensors &amp; motor drivers
                    </small>
                  </div>
                </div>

                <div
                  className="d-flex align-items-center gap-3 p-3 rounded-3"
                  style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: 'rgba(56, 189, 248, 0.18)',
                      color: '#38bdf8',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '20px',
                    }}
                  >
                    <i className="bi bi-truck"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-white" style={{ fontSize: '15px' }}>
                      Pan-India Fast Shipping
                    </h6>
                    <small className="text-light opacity-75" style={{ fontSize: '12px' }}>
                      Safe anti-static ESD packaging delivered to your door
                    </small>
                  </div>
                </div>

                <div
                  className="d-flex align-items-center gap-3 p-3 rounded-3"
                  style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: 'rgba(16, 185, 129, 0.18)',
                      color: '#34d399',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '20px',
                    }}
                  >
                    <i className="bi bi-patch-check-fill"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-white" style={{ fontSize: '15px' }}>
                      Tested by In-House Engineers
                    </h6>
                    <small className="text-light opacity-75" style={{ fontSize: '12px' }}>
                      Verified pinouts, datasheets &amp; sample code
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;