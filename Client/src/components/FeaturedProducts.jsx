import img11 from '../assets/11.png'
import img12 from '../assets/12.png'
import img13 from '../assets/13.png'
import img14 from '../assets/14.png'
import img15 from '../assets/15.png'
import img16 from '../assets/16.png'
import img17 from '../assets/17.png'
import img18 from '../assets/18.png'

const products = [
  { id: 1, name: '7-Segment Displays', category: 'DISPLAYS', price: '₹8,000', img: img11 },
  { id: 2, name: 'TFT', category: 'DISPLAYS', price: '₹595', img: img12 },
  { id: 3, name: '0.96 OLED LCD', category: 'INDICATORS', price: '₹7,000', img: img13 },
  { id: 4, name: '20x4LCD', category: 'INDICATORS', price: '₹600', img: img14 },
  { id: 5, name: '16x2 LCD', category: 'INDICATORS', price: '₹4,500', img: img15 },
  { id: 6, name: 'WS2812', category: 'INDICATORS', price: '₹4,530', img: img16 },
  { id: 7, name: 'DRV8825 Stepper Motor Driver', category: 'MOTORS', price: '₹3,450', img: img17 },
  { id: 8, name: 'L298N Motor Driver', category: 'MOTORS', price: '₹3,400', img: img18 },
]

const FeaturedProducts = () => {
  return (
    <section className="featured-section py-5">
      <div className="container">

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
          <div>
            <span className="category-subtitle">HANDPICKED FOR YOU</span>
            <h2 className="category-heading mt-1 mb-2">
              Featured <span className="text-orangered fst-italic">Products</span>
            </h2>
            <p className="category-text text-muted mb-0">
              Top-rated boards and components loved by engineers, students, and hobbyists.
            </p>
          </div>
          <button className="all-products-btn mt-3 mt-md-0">All Products →</button>
        </div>

        <div className="row g-3">
          {products.map((p) => (
            <div className="col-6 col-md-3" key={p.id}>
              <div className="product-card">
                <div className="product-img-wrap">
                  <img src={p.img} alt={p.name} className="product-img" />
                  <div className="product-hover-overlay">
                    <button className="view-btn">
                      <i className="bi bi-eye"></i> View
                    </button>
                    <button className="wishlist-btn">
                      <i className="bi bi-heart"></i>
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <p className="product-category">{p.category}</p>
                  <h6 className="product-name">{p.name}</h6>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="product-price">{p.price}</span>
                    <button className="btn btn-orangered cart-btn">
                      <i className="bi bi-plus"></i> Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default FeaturedProducts