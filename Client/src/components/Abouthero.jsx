import React from 'react';
import { Link } from 'react-router-dom';

const AboutHero = () => {
  return (
    <div className="about-hero py-5">
      <div className="container position-relative my-4 my-md-5" style={{ zIndex: 2 }}>
        <span className="section-eyebrow" style={{ color: 'var(--accent)' }}>
          Our Story
        </span>
        <h1 className="about-hero-title mb-3">
          Empowering <em>Makers</em>
          <br />
          Across India
        </h1>
        <p className="about-hero-desc">
          SoftproInnovation started with a simple belief: every engineer, student, and hobbyist deserves access to quality electronics components at fair prices, with support that actually helps them build.
        </p>
        <div className="d-flex gap-3 mt-4 flex-wrap">
          <Link to="/products" className="btn-hero-primary text-decoration-none">
            Browse Products
          </Link>
          <Link to="/contact" className="btn-hero-secondary text-decoration-none">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;