
import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import CategoryGrid from './components/Swiper'
import FeaturedProducts from './components/FeaturedProducts'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
//import AboutHero from './components/Abouthero'
const Home = () => {
  return (
    <div>
        <Header/>
        <Hero/>
        <CategoryGrid/>
        <FeaturedProducts/>
          <Testimonials/>
          {/* <AboutHero/> */}
          <Footer/>
    </div>
  )
}

export default Home