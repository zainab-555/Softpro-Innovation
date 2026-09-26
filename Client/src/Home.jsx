
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Browse from './components/Browse'
import FeaturedProducts from './components/FeaturedProducts'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  useEffect(() => {
    if (location.state?.orderPlaced) {
      setShowOrderSuccess(true);
      // Clean up state history so it doesn't re-trigger on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div>
        {showOrderSuccess && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px'
          }}>
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '32px 28px',
              maxWidth: '440px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#dcfce7',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                margin: '0 auto 16px'
              }}>
                ✓
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: '0 0 8px' }}>
                Order Placed Successfully!
              </h2>
              <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 24px', lineHeight: '1.5' }}>
                {location.state?.paymentSuccess
                  ? 'Payment successful! Your order has been placed and is being processed.'
                  : 'Your cash on delivery order has been placed successfully.'}
              </p>
              <button
                onClick={() => setShowOrderSuccess(false)}
                style={{
                  background: '#0f8585',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
        <Header/>
        <Hero/>
        <Browse/>
        <FeaturedProducts/>
        <Testimonials/>
        <Footer/>
    </div>
  )
}

export default Home