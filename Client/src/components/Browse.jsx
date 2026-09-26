import axios from "axios";
import { useEffect, useState } from "react";
import { getImageUrl } from "../utils/media";

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const visibleCategories = categories.filter((category) => category.images?.length > 0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(
          "http://localhost:5000/api/category/show"
        );
      console.log("Category API Response:", response.data.data);
      setCategories(response.data.data);
        // Agar response.data direct array hai
        // setCategories(response.data);
      } catch (err) {
        console.log("Category fetch error:", err);
        setError("Unable to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="category-section py-5">
      <div className="container">
        <span className="category-subtitle">BROWSE BY TYPE</span>

        <h2 className="category-heading mt-1 mb-2">
          Popular{" "}
          <span className="text-orangered fst-italic">Categories</span>
        </h2>

        <p className="category-text text-muted mb-4">
          Find exactly what your project needs from our curated electronics
          families.
        </p>
        {/* Loading */}
        {loading && (
          <div className="text-center py-4">
            <div className="spinner-border text-warning"></div>
            <p className="mt-2">Loading categories...</p>
          </div>
        )}
        {/* Error */}
        {!loading && error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        {/* Categories */}
        {!loading && !error && visibleCategories.length > 0 && (
          <div className="row g-3">
            {visibleCategories.map((cat) => (
              
              <div className="col-6 col-md-3" key={cat.id || cat._id}>
                <div className="category-card text-center p-4">
                  <div className="category-img-wrapper mb-3 mx-auto d-flex align-items-center justify-content-center">
                    <img
                      src={getImageUrl(cat.images[0], "categories")}
                      alt={cat.name}
                      className="img-fluid category-img"
                    />
                  </div>
                  <h6 className="category-card-title mb-0">
                    {cat.name}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* No categories */}
        {!loading && !error && visibleCategories.length === 0 && (
          <div className="text-center text-muted py-4">
            No categories found.
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryGrid;