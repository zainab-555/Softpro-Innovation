import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/media';
import { getWishlist, toggleWishlist as toggleWishlistApi } from '../utils/wishlist';
import { API_BASE_URL } from '../utils/apiConfig';

const FeaturedProducts = () => {
  const [products ,setProducts]  = useState([])
  const handlefetch = async()=>{
    try{
        const res = await axios.get(`${API_BASE_URL}/api/product/home/active`);
        console.log(res.data.data);
        setProducts(res.data.data)
        
    }catch(er){
      console.log(er);
      alert("server error")
    }

  }
  useEffect(()=>{
    handlefetch()
  },[])
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    getWishlist().then((items) => setWishlist(items.map((item) => item.product_id?._id || item.product_id))).catch(() => {});
  }, []);

  const toggleWishlist = async (id) => {
    const result = await toggleWishlistApi(id);
    setWishlist((current) => result.active ? [...new Set([...current, id])] : current.filter((item) => item !== id));
  };

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
              Top-rated hardware displays, indicators and motor drivers (p1 to p8 series).
            </p>
          </div>
          <Link to="/Product" className="all-products-btn mt-3 mt-md-0 text-decoration-none d-inline-block">
            All Products →
          </Link>
        </div>

        <div className="row g-4">
          {products.map((p) => {
            const productId = p._id || p.id;
            const isFav = wishlist.includes(productId);
            return (
              <div className="col-6 col-md-3" key={productId}>
                <div className="product-card h-100 d-flex flex-column justify-content-between">
                  <div>
                    {/* Image Wrap */}
                    <div className="product-img-wrap position-relative p-3 text-center">
                      {/* Always Visible Wishlist Button */}
                      <button
                        className="position-absolute top-0 end-0 m-2 rounded-circle border-0 d-flex align-items-center justify-content-center"
                        type="button"
                        onClick={() => toggleWishlist(productId)}
                        style={{
                          width: "32px",
                          height: "32px",
                          background: isFav ? "#E05C2A" : "rgba(255, 255, 255, 0.95)",
                          color: isFav ? "#ffffff" : "#E05C2A",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          zIndex: 3,
                        }}
                        title="Add to Wishlist"
                      >
                        <i className={`bi ${isFav ? "bi-heart-fill" : "bi-heart"}`} style={{ fontSize: "14px" }}></i>
                      </button>

                      <Link to="/Product">
                      {console.log(p)}
                        <img
                          src={getImageUrl(p.images?.[0]) || '/placeholder-product.png'}
                          alt={p.name}
                          className="product-img"
                          style={{ maxHeight: '150px', objectFit: 'contain', width: 'auto' }}
                        />
                      </Link>
                    </div>

                    {/* Info */}
                    <div className="product-info px-3 pt-2">
                      <p className="product-category text-muted mb-1" style={{ fontSize: '11px' }}>{p.category_id?.name || 'Embedded hardware'}</p>
                      <h6 className="product-name fw-bold mb-2 text-truncate">{p.name}</h6>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-3 pb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="product-price fw-bold" style={{ color: '#E05C2A', fontSize: '16px' }}>₹{Number(p.price || 0).toLocaleString('en-IN')}</span>
                      <span className="badge bg-success-subtle text-success border border-success-subtle" style={{ fontSize: '10px' }}>In Stock</span>
                    </div>

                    <div className="d-flex gap-2">
                      <Link
                        to="/Product"
                        className="btn flex-fill py-2 text-decoration-none d-flex align-items-center justify-content-center gap-1"
                        style={{
                          background: "rgba(224, 92, 42, 0.08)",
                          border: "1.5px solid #E05C2A",
                          color: "#E05C2A",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        <i className="bi bi-eye"></i> View
                      </Link>
                      <Link
                        to="/Product"
                        className="btn btn-orangered flex-fill py-2 text-decoration-none d-flex align-items-center justify-content-center gap-1"
                        style={{
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        <i className="bi bi-cart-plus-fill"></i> Cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;