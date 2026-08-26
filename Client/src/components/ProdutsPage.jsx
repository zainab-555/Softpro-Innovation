import { useState } from "react";

import img1 from "../assets/p1.png";
import img2 from "../assets/p2.png";
import img3 from "../assets/p3.png";
import img4 from "../assets/p4.png";
import img5 from "../assets/p5.png";
import img6 from "../assets/p6.png";
import img7 from "../assets/p7.png";
import img8 from "../assets/p8.png";

const categories = [
    "All",
    "Displays",
    "Indicators",
    "Motors",
    "Actuators",
    "Battery Components",
    "Power Components",
    "Communication Modules",
    "Sensors",
    "Microcontrollers",
    "Development Boards",
];

const products = [
    {
        id: 1,
        image: img1,
        category: "Displays",
        name: "7-Segment Displays",
        badge: "Featured",
        discount: "10% OFF",
        price: 2300,
        oldPrice: 2600,
    },
    {
        id: 2,
        image: img2,
        category: "Displays",
        name: "TFT",
        badge: "Featured",
        discount: "20% OFF",
        price: 476,
        oldPrice: 600,
    },
    {
        id: 3,
        image: img3,
        category: "Indicators",
        name: "0.96 OLED LCD",
        badge: "Featured",
        discount: "10% OFF",
        price: 6300,
        oldPrice: 7000,
    },
    {
        id: 4,
        image: img4,
        category: "Indicators",
        name: "20x4 LCD",
        badge: "Featured",
        discount: "10% OFF",
        price: 540,
        oldPrice: 600,
    },
    {
        id: 5,
        image: img5,
        category: "Indicators",
        name: "16x2 LCD",
        badge: "Featured",
        discount: "10% OFF",
        price: 4030,
        oldPrice: 4500,
    },
    {
        id: 6,
        image: img6,
        category: "Indicators",
        name: "WS2812",
        badge: "Featured",
        discount: "10% OFF",
        price: 4077,
        oldPrice: 4500,
    },
    {
        id: 7,
        image: img7,
        category: "Motors",
        name: "DRV8825 Stepper Motor Driver",
        badge: "Featured",
        discount: "10% OFF",
        price: 3105,
        oldPrice: 3400,
    },
    {
        id: 8,
        image: img8,
        category: "Motors",
        name: "L298N Motor Driver",
        badge: "Featured",
        discount: "10% OFF",
        price: 3060,
        oldPrice: 3400,
    },
];

function ProductCard({ product }) {
    return (
        <div className="product-card">
            <div className="product-image-wrap">
                <span className="badge-featured">{product.badge}</span>
                <img src={product.image} alt={product.name} />
                <span className="badge-discount">{product.discount}</span>
            </div>

            <div className="product-body">
                <p className="product-category">{product.category}</p>
                <h3 className="product-name">{product.name}</h3>

                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <span className="product-price">
                            ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        <span className="product-old-price">
                            ₹{product.oldPrice.toLocaleString("en-IN")}
                        </span>
                    </div>
                    <button className="btn btn-view">View</button>
                </div>
            </div>
        </div>
    );
}

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");

    const filtered = products.filter((p) => {
        const matchesCategory =
            activeCategory === "All" || p.category === activeCategory;
        const matchesSearch = p.name
            .toLowerCase()
            .includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="products-page">
            <div className="container-fluid">
                {/* Header */}
                <div className="products-header">
                    <p className="products-breadcrumb">
                        <a href="/">Home</a> <span>›</span> Products
                    </p>
                    <h1 className="products-title">
                        All <em>Products</em>
                    </h1>
                    <div className="products-title-underline"></div>
                    <p className="products-subtitle">
                        Browse {products.length} electronic components, boards, and
                        accessories.
                    </p>
                </div>

                {/* Search + sort */}
                <div className="products-toolbar">
                    <div className="search-wrap">
                        <svg
                            className="search-icon"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="products-search"
                        />
                    </div>
                    <div className="sort-wrap">
                        <span className="sort-label">Sort:</span>
                        <select className="products-sort">
                            <option>Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Category tabs */}
                <div className="mb-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`category-btn ${activeCategory === cat ? "active" : ""
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product grid */}
                <div className="row g-3">
                    {filtered.map((product) => (
                        <div key={product.id} className="col-6 col-md-4 col-lg-3">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}