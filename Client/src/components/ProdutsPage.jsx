import axios from "axios";
import { useEffect, useState } from "react";
import img11 from "../assets/11.png";
import img12 from "../assets/12.png";
import img13 from "../assets/13.png";
import img17 from "../assets/17.png";
import img1 from "../assets/p1.png";
import img2 from "../assets/p2.png";
import img3 from "../assets/p3.png";
import img4 from "../assets/p4.png";
import img5 from "../assets/p5.png";
import img6 from "../assets/p6.png";
import img7 from "../assets/p7.png";
import img8 from "../assets/p8.png";
import { addToCart } from "../utils/cart";
import { getImageUrl } from "../utils/media";
import { getWishlist, toggleWishlist as toggleWishlistApi } from "../utils/wishlist";

const categories = ["All", "Displays", "Indicators", "Motors", "Sensors & Boards"];

const allProducts = [
  {
    id: 1,
    image: img1,
    gallery: [img1, img11, img12],
    sku: "DISP-7SEG-01",
    category: "Displays",
    name: "7-Segment Displays (Pack of 5)",
    shortDesc: "Common cathode 0.56\" bright red numeric digital displays for robotics & counting meters.",
    longDesc: "Premium quality 0.56-inch 7-Segment LED displays engineered with high luminous intensity and low power consumption. Perfect for digital clocks, counters, scoreboards, and microcontroller DIY electronics.",
    specs: [
      "Type: 7-Segment Common Cathode",
      "Digit Height: 0.56 Inch (14.2 mm)",
      "Forward Voltage: 2.0V - 2.4V DC",
      "Forward Current: 20mA per segment",
      "Wavelength: 625nm (Vibrant Red)",
      "Package: Standard 10-pin DIP"
    ],
    features: ["High contrast epoxy face", "Breadboard friendly 0.1\" spacing", "Excellent daylight readability"],
    badge: "Bestseller",
    discount: "10% OFF",
    price: 2300,
    oldPrice: 2600,
    rating: 4.9,
    reviews: 48,
    stockCount: 14,
    inStock: true,
  },
  {
    id: 2,
    image: img2,
    gallery: [img2, img12, img11],
    sku: "DISP-TFT-02",
    category: "Displays",
    name: "TFT 2.4 Inch Color Touch Display",
    shortDesc: "High resolution 240x320 SPI TFT LCD panel with resistive touchscreen for Arduino & ESP32.",
    longDesc: "A responsive 2.4-inch Color TFT LCD screen equipped with ILI9341 controller and integrated SD card reader. Delivers rich 65K color reproduction and smooth GUI rendering for smart home panels and portable gauges.",
    specs: [
      "Resolution: 240 x 320 RGB Pixels",
      "Driver IC: ILI9341 (4-Wire SPI)",
      "Touch Controller: XPT2046",
      "SD Card Slot: Built-in MicroSD",
      "Operating Voltage: 3.3V - 5.0V",
      "Viewing Angle: 160° Wide View"
    ],
    features: ["Built-in touch stylus support", "Direct 3.3V / 5V level shifter", "Adafruit GFX library compatible"],
    badge: "20% OFF",
    discount: "20% OFF",
    price: 476,
    oldPrice: 600,
    rating: 4.7,
    reviews: 32,
    stockCount: 8,
    inStock: true,
  },
  {
    id: 3,
    image: img3,
    gallery: [img3, img13, img1],
    sku: "IND-OLED-03",
    category: "Indicators",
    name: "0.96 Inch OLED I2C Display (128x64)",
    shortDesc: "Ultra-crisp monochrome blue/white OLED display module with SSD1306 high-speed I2C interface.",
    longDesc: "Self-illuminating high-definition OLED display module that requires no backlight. Offers deep true blacks, high contrast, and minimal power consumption suitable for wearable devices and sensor dashboards.",
    specs: [
      "Resolution: 128 x 64 Dots",
      "Driver IC: SSD1306",
      "Communication: I2C Interface (0x3C / 0x3D)",
      "Power Draw: 0.04W (Ultra Low)",
      "Input Voltage: 3.3V - 5.0V DC",
      "Dimensions: 27 x 27 x 4.1 mm"
    ],
    features: ["No backlight required (true black)", "Wide view angle > 160 degrees", "Only 2 GPIO pins required"],
    badge: "Featured",
    discount: "10% OFF",
    price: 6300,
    oldPrice: 7000,
    rating: 5.0,
    reviews: 84,
    stockCount: 22,
    inStock: true,
  },
  {
    id: 4,
    image: img4,
    gallery: [img4, img11, img13],
    sku: "IND-LCD204-04",
    category: "Indicators",
    name: "20x4 Alphanumeric LCD Module",
    shortDesc: "20 Characters x 4 Lines large character LCD module with HD44780 standard and blue LED backlight.",
    longDesc: "Large format 20x4 character matrix liquid crystal display with crisp white text on vivid blue background. Ideal for industrial machinery, security panels, 3D printer interfaces, and robotics telemetry.",
    specs: [
      "Format: 20 Characters x 4 Lines",
      "Controller: SPLC780D / HD44780",
      "Interface: 4-bit / 8-bit Parallel or I2C adapter",
      "Backlight: White text on Blue LED",
      "Supply: 5.0V DC",
      "PCB Dimensions: 98 x 60 mm"
    ],
    features: ["High reliability in harsh environments", "Contrast adjustment potentiometer support", "Standard 16-pin interface"],
    badge: "Popular",
    discount: "10% OFF",
    price: 540,
    oldPrice: 600,
    rating: 4.8,
    reviews: 26,
    stockCount: 15,
    inStock: true,
  },
  {
    id: 5,
    image: img5,
    gallery: [img5, img12, img17],
    sku: "IND-LCD162-05",
    category: "Indicators",
    name: "16x2 Standard Character LCD",
    shortDesc: "Industry-standard 16x2 alphanumeric display with crisp yellow-green backlight for IoT projects.",
    longDesc: "The universal 16x2 character display for all student and prototyping needs. Backlit with high-efficiency LEDs for clear visibility under all ambient lighting conditions.",
    specs: [
      "Format: 16 Characters x 2 Rows",
      "Character Size: 2.95 x 4.35 mm",
      "Controller: HD44780 Compatible",
      "Operating Voltage: 4.5V - 5.5V",
      "Backlight Current: 15mA",
      "Temperature Range: -20°C to +70°C"
    ],
    features: ["Plug-and-play with Arduino LiquidCrystal", "Rugged construction", "Low operating power"],
    badge: "Top Value",
    discount: "10% OFF",
    price: 4030,
    oldPrice: 4500,
    rating: 4.6,
    reviews: 19,
    stockCount: 30,
    inStock: true,
  },
  {
    id: 6,
    image: img6,
    gallery: [img6, img13, img17],
    sku: "IND-WS2812-06",
    category: "Indicators",
    name: "WS2812 5050 RGB Addressable LED Ring",
    shortDesc: "Individually addressable smart full-color RGB LED ring with integrated WS2812B micro-controllers.",
    longDesc: "Circular smart LED ring featuring 16 integrated 5050 RGB LEDs with internal PWM chips. Control all colors and animations via a single digital microcontroller pin.",
    specs: [
      "LED Type: WS2812B 5050 RGB",
      "Color Resolution: 24-bit (16.7M Colors)",
      "Control Protocol: Single-wire NRZ",
      "Voltage: 5V DC (4.5V - 5.5V)",
      "Outer Diameter: 45 mm",
      "Cascadable: Yes (Data IN / OUT)"
    ],
    features: ["Chainable multiple rings", "FastPWM refresh rate > 400Hz", "FastLED / NeoPixel ready"],
    badge: "RGB Neon",
    discount: "10% OFF",
    price: 4077,
    oldPrice: 4500,
    rating: 4.9,
    reviews: 62,
    stockCount: 18,
    inStock: true,
  },
  {
    id: 7,
    image: img7,
    gallery: [img7, img17, img8],
    sku: "MOT-DRV-07",
    category: "Motors",
    name: "DRV8825 Microstepping Stepper Driver",
    shortDesc: "High-precision bipolar stepper motor driver module with adjustable current limiting & 1/32 microstepping.",
    longDesc: "Upgraded carrier board for Texas Instruments DRV8825 stepper motor driver. Handles up to 2.5A peak per coil with thermal shutdown, under-voltage lockout, and 6 microstep resolutions up to 1/32-step.",
    specs: [
      "Motor Voltage: 8.2V - 45V DC",
      "Output Current: 1.5A continuous (2.5A peak)",
      "Microstep Modes: Full, 1/2, 1/4, 1/8, 1/16, 1/32",
      "Over-Temp: Automatic thermal shutdown",
      "Dimensions: 15 x 20 mm (Pololu footprint)"
    ],
    features: ["Aluminum heatsink included", "Direct drop-in replacement for A4988", "Ideal for 3D printers and CNCs"],
    badge: "Precision",
    discount: "10% OFF",
    price: 3105,
    oldPrice: 3400,
    rating: 4.8,
    reviews: 41,
    stockCount: 12,
    inStock: true,
  },
  {
    id: 8,
    image: img8,
    gallery: [img8, img17, img7],
    sku: "MOT-L298-08",
    category: "Motors",
    name: "L298N Dual H-Bridge Motor Driver",
    shortDesc: "Heavy-duty dual H-bridge motor driver module for driving DC motors, stepper motors, and solenoids.",
    longDesc: "High-power dual full-bridge motor driver equipped with heavy-duty aluminum heatsink and built-in 78M05 5V regulator. Capable of driving two independent DC motors or one 4-wire two-phase stepper motor.",
    specs: [
      "Driver IC: ST L298N Dual H-Bridge",
      "Drive Voltage: 5V - 35V DC",
      "Peak Output Current: 2A per bridge",
      "Logic Voltage: 5V (On-board 5V LDO)",
      "Control: PWM Speed + Direction"
    ],
    features: ["High capacitance filter capacitors", "Back-EMF flyback diodes built-in", "Screw terminals for power"],
    badge: "Heavy Duty",
    discount: "10% OFF",
    price: 3060,
    oldPrice: 3400,
    rating: 4.7,
    reviews: 73,
    stockCount: 25,
    inStock: true,
  },
];

export default function ProductsPage() {
  const [catalogProducts, setCatalogProducts] = useState(allProducts);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeGalleryImg, setActiveGalleryImg] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState("overview"); // "overview" | "specs" | "features"
  const [toastMessage, setToastMessage] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/product/show?limit=100")
      .then(({ data }) => {
        const importedProducts = (data.data || []).map((product) => ({
          ...product,
          id: product._id,
          image: getImageUrl(product.images?.[0]),
          gallery: (product.images || []).map((image) => getImageUrl(image)),
          category: product.category_id?.name || "Embedded hardware",
          shortDesc: product.short_description || product.description || "Quality component for IoT and robotics projects.",
          longDesc: product.description || product.short_description || "Reliable hardware for makers and engineers.",
          oldPrice: product.original_price || product.price,
          rating: 4.7,
          reviews: 0,
          stockCount: product.stock_quantity || 0,
          specs: [],
          features: product.tags || [],
          discount: "",
          badge: product.is_featured ? "Featured" : "",
        }));
        if (importedProducts.length) setCatalogProducts(importedProducts);
      })
      .catch(() => {
        // Keep the local showcase available when the API is offline.
      });
  }, []);

  useEffect(() => {
    getWishlist().then((items) => setWishlist(items.map((item) => item.product_id?._id || item.product_id))).catch(() => {});
  }, []);

  const toggleWishlist = async (id) => {
    try {
      const result = await toggleWishlistApi(id);
      setWishlist((current) => result.active ? [...new Set([...current, id])] : current.filter((itemId) => itemId !== id));
      showToast(result.active ? "Added to wishlist" : "Removed from wishlist");
    } catch {
      showToast("Wishlist update nahi ho paaya.");
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const handleOpenQuickView = (product) => {
    setSelectedProduct(product);
    setActiveGalleryImg(product.image);
    setActiveModalTab("overview");
    setQuantity(1);
    setPincodeStatus("");
  };

  const handleAddToCart = async (product, qty = 1, buyNow = false) => {
    try {
      await addToCart(product, qty);
      showToast(`Added ${qty}x "${product.name}" to cart!`);
      if (buyNow) window.location.href = "/cart";
    } catch {
      showToast("Cart me add nahi ho paaya. Please try again.");
    }
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) {
      setPincodeStatus("error");
    } else {
      setPincodeStatus("success");
    }
  };

  const productCategories = ["All", ...new Set(catalogProducts.map((product) => product.category))];
  const filteredProducts = catalogProducts
    .filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.shortDesc.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      if (sortBy === "Customer Rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div style={{ backgroundColor: "#f4ede8", minHeight: "100vh", paddingBottom: "70px" }}>
      {/* Toast Alert */}
      {toastMessage && (
        <div
          className="position-fixed top-0 end-0 m-4 shadow-lg d-flex align-items-center gap-2 px-4 py-3 rounded-4 text-white"
          style={{
            background: "#E05C2A",
            zIndex: 99999,
            fontWeight: 600,
            fontSize: "14px",
            boxShadow: "0 10px 30px rgba(224, 92, 42, 0.4)",
          }}
        >
          <i className="bi bi-check-circle-fill"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header Section */}
      <section className="py-5" style={{ background: "linear-gradient(135deg, #181133 0%, #25143a 100%)", color: "white" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge-new mb-2">PREMIER ELECTRONICS &amp; HARDWARE</span>
              <h1 className="hero-heading mb-2" style={{ fontSize: "44px" }}>
                All <span className="text-orangered fst-italic">Products</span>
              </h1>
              <p className="hero-text text-light mb-4" style={{ maxWidth: "650px", opacity: 0.9 }}>
                Browse our collection of 8 premier robotic components, microcontroller displays, LED indicators, and high-torque motor driver modules (p1 – p8).
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <span className="badge rounded-pill bg-white text-dark py-2 px-3 fw-semibold shadow-sm">
                  <i className="bi bi-truck text-orangered me-1"></i> Fast Delivery
                </span>
                <span className="badge rounded-pill bg-white text-dark py-2 px-3 fw-semibold shadow-sm">
                  <i className="bi bi-shield-check text-orangered me-1"></i> 100% Genuine Quality
                </span>
                <span className="badge rounded-pill bg-white text-dark py-2 px-3 fw-semibold shadow-sm">
                  <i className="bi bi-lightning-charge-fill text-orangered me-1"></i> In Stock &amp; Tested
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Content */}
      <main className="container pt-5">
        {/* Filter & Toolbar Row */}
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4 p-3 bg-white rounded-4 shadow-sm border">
          {/* Search Box */}
          <div className="position-relative" style={{ minWidth: "280px" }}>
            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search components (e.g. OLED, TFT, Stepper)..."
              className="form-control ps-5 rounded-pill border-light-subtle"
              style={{ fontSize: "14px", height: "42px" }}
            />
            {search && (
              <i
                className="bi bi-x-circle-fill position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                style={{ cursor: "pointer" }}
                onClick={() => setSearch("")}
              ></i>
            )}
          </div>

          {/* Category Tabs */}
          <div className="d-flex gap-2 flex-wrap">
            {productCategories.map((cat) => {
              const count =
                cat === "All"
                  ? catalogProducts.length
                  : catalogProducts.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${
                    activeCategory === cat
                      ? "btn-orangered text-white"
                      : "btn-outline-secondary bg-light text-dark border-0"
                  }`}
                  style={{
                    fontSize: "13px",
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat} <span style={{ opacity: 0.8, fontSize: "11px" }}>({count})</span>
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted small fw-semibold">Sort by:</span>
            <select
              className="form-select form-select-sm rounded-3 border-light-subtle fw-semibold"
              style={{ width: "auto", fontSize: "13px" }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Featured">Featured</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Customer Rating">Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Products Grid (8 Items with p1 to p8 images) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm my-4">
            <i className="bi bi-box-seam text-muted" style={{ fontSize: "48px" }}></i>
            <h4 className="fw-bold mt-3">No Products Found</h4>
            <p className="text-muted">Try clearing your search query or selecting a different category.</p>
            <button className="btn btn-orangered text-white px-4" onClick={() => { setSearch(""); setActiveCategory("All"); }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {filteredProducts.map((p) => {
              const isFav = wishlist.includes(p.id);
              return (
                <div key={p.id} className="col-12 col-sm-6 col-lg-3">
                  <div className="product-card h-100 d-flex flex-column justify-content-between shadow-sm">
                    <div>
                      {/* Image Wrap */}
                      <div className="product-img-wrap position-relative">
                        <span
                          className="position-absolute top-0 start-0 m-2 badge px-2 py-1"
                          style={{ backgroundColor: "#E05C2A", fontSize: "11px", borderRadius: "6px", zIndex: 2 }}
                        >
                          {p.badge}
                        </span>

                        {/* Always-Visible Wishlist Heart Button */}
                        <button
                          className="position-absolute top-0 end-0 m-2 rounded-circle border-0 d-flex align-items-center justify-content-center"
                          type="button"
                          onClick={() => toggleWishlist(p.id)}
                          style={{
                            width: "34px",
                            height: "34px",
                            background: isFav ? "#E05C2A" : "rgba(255, 255, 255, 0.95)",
                            color: isFav ? "#ffffff" : "#E05C2A",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            zIndex: 3,
                          }}
                          title="Add to Wishlist"
                        >
                          <i className={`bi ${isFav ? "bi-heart-fill" : "bi-heart"}`} style={{ fontSize: "15px" }}></i>
                        </button>

                        <img
                          src={p.image}
                          alt={p.name}
                          className="product-img"
                          style={{
                            maxHeight: "150px",
                            maxWidth: "100%",
                            objectFit: "contain",
                            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            cursor: "pointer",
                          }}
                          onClick={() => handleOpenQuickView(p)}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        />
                      </div>

                      {/* Info */}
                      <div className="product-info px-3 pt-2">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="product-category text-muted text-uppercase" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                            {p.category}
                          </span>
                          <span className="small fw-semibold" style={{ color: "#E05C2A" }}>
                            ★ {p.rating}
                          </span>
                        </div>

                        <h6
                          className="product-name fw-bold mb-2 text-truncate"
                          title={p.name}
                          style={{ fontSize: "15px", color: "#1e293b", cursor: "pointer" }}
                          onClick={() => handleOpenQuickView(p)}
                        >
                          {p.name}
                        </h6>

                        <p className="text-muted small mb-3" style={{ fontSize: "12px", lineHeight: "1.4", height: "34px", overflow: "hidden" }}>
                          {p.shortDesc}
                        </p>
                      </div>
                    </div>

                    {/* Price & Action Buttons (Quick View + Cart Always Visible) */}
                    <div className="px-3 pb-3">
                      <div className="d-flex justify-content-between align-items-baseline mb-2">
                        <div>
                          <span className="product-price fw-bold" style={{ fontSize: "18px", color: "#E05C2A" }}>
                            ₹{p.price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-muted small text-decoration-line-through ms-2" style={{ fontSize: "12px" }}>
                            ₹{p.oldPrice.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <span className="badge bg-success-subtle text-success border border-success-subtle" style={{ fontSize: "10px" }}>
                          In Stock
                        </span>
                      </div>

                      <div className="d-flex gap-2 flex-wrap">
                        <button
                          className="btn flex-fill py-2 d-flex align-items-center justify-content-center gap-1"
                          type="button"
                          onClick={() => handleOpenQuickView(p)}
                          style={{
                            background: "rgba(224, 92, 42, 0.08)",
                            border: "1.5px solid #E05C2A",
                            color: "#E05C2A",
                            borderRadius: "8px",
                            fontSize: "13px",
                            fontWeight: 600,
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#E05C2A";
                            e.currentTarget.style.color = "#ffffff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(224, 92, 42, 0.08)";
                            e.currentTarget.style.color = "#E05C2A";
                          }}
                        >
                          <i className="bi bi-eye"></i> Quick View
                        </button>

                        <button
                          className="btn btn-orangered flex-fill py-2 d-flex align-items-center justify-content-center gap-1"
                          type="button"
                          onClick={() => handleAddToCart(p, 1)}
                          style={{
                            borderRadius: "8px",
                            fontSize: "13px",
                            fontWeight: 600,
                          }}
                        >
                          <i className="bi bi-cart-plus-fill"></i> Add
                        </button>
                        <button
                          className="btn btn-warning flex-fill py-2 d-flex align-items-center justify-content-center gap-1"
                          type="button"
                          onClick={() => handleAddToCart(p, 1, true)}
                          style={{ borderRadius: "8px", fontSize: "13px", fontWeight: 600 }}
                        >
                          <i className="bi bi-lightning-charge-fill"></i> Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quality Assurance / Trust Badges Banner */}
        <section className="mt-5 p-4 bg-white rounded-4 shadow-sm border">
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3">
              <div className="p-2">
                <i className="bi bi-award text-orangered" style={{ fontSize: "32px" }}></i>
                <h6 className="fw-bold mt-2 mb-1">100% Tested Modules</h6>
                <p className="text-muted small mb-0">Every board verified before dispatch.</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-2">
                <i className="bi bi-box-seam-fill text-orangered" style={{ fontSize: "32px" }}></i>
                <h6 className="fw-bold mt-2 mb-1">Safe Antistatic Packing</h6>
                <p className="text-muted small mb-0">ESD-safe foam and shielded bubbles.</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-2">
                <i className="bi bi-arrow-repeat text-orangered" style={{ fontSize: "32px" }}></i>
                <h6 className="fw-bold mt-2 mb-1">7-Day Easy Returns</h6>
                <p className="text-muted small mb-0">Hassle-free replacement policy.</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-2">
                <i className="bi bi-headset text-orangered" style={{ fontSize: "32px" }}></i>
                <h6 className="fw-bold mt-2 mb-1">Technical Assistance</h6>
                <p className="text-muted small mb-0">Direct engineer support on pinouts.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==========================================================================
          Premium Quick View Modal (Multi-Photo Gallery, Clean Orangered Theme)
          ========================================================================== */}
      {selectedProduct && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background: "rgba(15, 23, 42, 0.82)",
            backdropFilter: "blur(8px)",
            zIndex: 99999,
            padding: "16px",
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-4 shadow-2xl position-relative overflow-hidden"
            style={{
              maxWidth: "880px",
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.4)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar with Close Button */}
            <div
              className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom"
              style={{ background: "#ffffff", position: "sticky", top: 0, zIndex: 10 }}
            >
              <div className="d-flex align-items-center gap-2">
                <span className="badge" style={{ backgroundColor: "#E05C2A", fontSize: "11px" }}>
                  {selectedProduct.category}
                </span>
                <span className="text-muted small">
                  SKU: <strong className="text-dark">{selectedProduct.sku}</strong>
                </span>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close"
              ></button>
            </div>

            <div className="row g-0">
              {/* Product Gallery Column */}
              <div
                className="col-md-5 p-4 d-flex flex-column align-items-center justify-content-between"
                style={{ background: "#f8fafc", borderRight: "1px solid #edf2f7" }}
              >
                {/* Main Large Selected Image */}
                <div
                  className="d-flex align-items-center justify-content-center w-100 p-3 rounded-3 bg-white border"
                  style={{ minHeight: "260px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}
                >
                  <img
                    src={activeGalleryImg || selectedProduct.image}
                    alt={selectedProduct.name}
                    style={{
                      maxHeight: "220px",
                      maxWidth: "100%",
                      objectFit: "contain",
                      transition: "all 0.3s ease",
                      filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.08))",
                    }}
                  />
                </div>

                {/* Multiple Thumbnails Gallery Strip */}
                <div className="w-100 mt-3">
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    {selectedProduct.gallery?.map((gImg, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveGalleryImg(gImg)}
                        className="rounded-3 p-1 bg-white"
                        style={{
                          width: "60px",
                          height: "60px",
                          cursor: "pointer",
                          border: `2px solid ${activeGalleryImg === gImg ? "#E05C2A" : "#e2e8f0"}`,
                          boxShadow: activeGalleryImg === gImg ? "0 0 10px rgba(224, 92, 42, 0.3)" : "none",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <img
                          src={gImg}
                          alt="Thumbnail"
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-muted small mt-2 mb-0" style={{ fontSize: "11px" }}>
                    Click thumbnail to view multiple angles
                  </p>
                </div>
              </div>

              {/* Product Details & Specs Column */}
              <div className="col-md-7 p-4 p-lg-5 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                      <i className="bi bi-check-circle-fill me-1"></i> In Stock ({selectedProduct.stockCount} left)
                    </span>
                    <span className="small fw-semibold" style={{ color: "#E05C2A" }}>
                      ★ {selectedProduct.rating} ({selectedProduct.reviews} customer reviews)
                    </span>
                  </div>

                  <h3 className="fw-bold text-dark mb-2" style={{ fontFamily: "Georgia, serif" }}>
                    {selectedProduct.name}
                  </h3>

                  {/* Clean Price Display */}
                  <div className="d-flex align-items-baseline gap-3 my-3 p-3 rounded-3" style={{ background: "#fdf8f5", border: "1px solid #fae6de" }}>
                    <div>
                      <span className="small text-muted d-block">Special Offer Price</span>
                      <span className="fw-bold fs-2" style={{ color: "#E05C2A" }}>
                        ₹{selectedProduct.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="ms-2">
                      <span className="text-muted text-decoration-line-through small d-block">
                        MRP ₹{selectedProduct.oldPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="badge bg-danger-subtle text-danger border border-danger-subtle">
                        {selectedProduct.discount}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Nav Tabs inside Modal */}
                  <div className="d-flex gap-2 border-bottom pb-2 mb-3">
                    <button
                      className={`btn btn-sm ${activeModalTab === "overview" ? "btn-orangered text-white" : "btn-light text-secondary"}`}
                      style={{ borderRadius: "6px", fontSize: "12px" }}
                      onClick={() => setActiveModalTab("overview")}
                    >
                      Overview
                    </button>
                    <button
                      className={`btn btn-sm ${activeModalTab === "specs" ? "btn-orangered text-white" : "btn-light text-secondary"}`}
                      style={{ borderRadius: "6px", fontSize: "12px" }}
                      onClick={() => setActiveModalTab("specs")}
                    >
                      Specifications
                    </button>
                    <button
                      className={`btn btn-sm ${activeModalTab === "features" ? "btn-orangered text-white" : "btn-light text-secondary"}`}
                      style={{ borderRadius: "6px", fontSize: "12px" }}
                      onClick={() => setActiveModalTab("features")}
                    >
                      Pinouts &amp; Features
                    </button>
                  </div>

                  {/* Tab Content */}
                  {activeModalTab === "overview" && (
                    <div className="small text-secondary mb-3" style={{ lineHeight: "1.6" }}>
                      <p className="mb-2">{selectedProduct.longDesc}</p>
                      <div className="d-flex gap-2 flex-wrap text-dark small fw-semibold">
                        <span className="badge bg-light text-dark border"><i className="bi bi-box-seam me-1 text-orangered"></i> ESD Sealed</span>
                        <span className="badge bg-light text-dark border"><i className="bi bi-shield-check me-1 text-orangered"></i> 100% Quality Tested</span>
                        <span className="badge bg-light text-dark border"><i className="bi bi-lightning-fill me-1 text-orangered"></i> Same Day Dispatch</span>
                      </div>
                    </div>
                  )}

                  {activeModalTab === "specs" && (
                    <div className="p-3 bg-light rounded-3 mb-3 small">
                      <ul className="list-unstyled mb-0">
                        {selectedProduct.specs.map((spec, i) => (
                          <li key={i} className="mb-1 d-flex align-items-center gap-2 text-dark">
                            <i className="bi bi-check-circle-fill text-orangered small"></i> {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeModalTab === "features" && (
                    <div className="p-3 bg-light rounded-3 mb-3 small">
                      <ul className="list-unstyled mb-0">
                        {selectedProduct.features.map((feat, i) => (
                          <li key={i} className="mb-1 d-flex align-items-center gap-2 text-dark">
                            <i className="bi bi-stars text-orangered small"></i> {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Delivery Pincode Checker Simulation */}
                  <form onSubmit={handleCheckPincode} className="mb-4">
                    <div className="d-flex gap-2">
                      <input
                        type="text"
                        maxLength="6"
                        placeholder="Enter delivery Pincode..."
                        className="form-control form-control-sm rounded-3"
                        style={{ maxWidth: "200px", fontSize: "12px" }}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                      />
                      <button type="submit" className="btn btn-sm btn-outline-secondary px-3" style={{ fontSize: "12px" }}>
                        Check
                      </button>
                    </div>
                    {pincodeStatus === "success" && (
                      <small className="text-success fw-semibold mt-1 d-block" style={{ fontSize: "11px" }}>
                        <i className="bi bi-truck me-1"></i> Delivery available in 2-3 business days!
                      </small>
                    )}
                    {pincodeStatus === "error" && (
                      <small className="text-danger mt-1 d-block" style={{ fontSize: "11px" }}>
                        Please enter a valid 6-digit Pincode.
                      </small>
                    )}
                  </form>
                </div>

                {/* Quantity & Action Buttons */}
                <div>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <span className="small fw-semibold text-dark">Quantity:</span>
                    <div className="input-group" style={{ width: "120px" }}>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="form-control form-control-sm text-center fw-bold bg-white"
                        value={quantity}
                        readOnly
                      />
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        type="button"
                        onClick={() => setQuantity(Math.min(selectedProduct.stockCount, quantity + 1))}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-muted small">Max {selectedProduct.stockCount} units</span>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-orangered flex-grow-1 py-2 fw-semibold shadow-sm"
                      type="button"
                      onClick={() => {
                        handleAddToCart(selectedProduct, quantity);
                        setSelectedProduct(null);
                      }}
                    >
                      <i className="bi bi-cart-plus-fill me-2"></i> Add {quantity} to Cart • ₹{(selectedProduct.price * quantity).toLocaleString("en-IN")}
                    </button>
                    <button
                      className="btn btn-warning flex-grow-1 py-2 fw-semibold shadow-sm"
                      type="button"
                      onClick={() => handleAddToCart(selectedProduct, quantity, true)}
                    >
                      <i className="bi bi-lightning-charge-fill me-2"></i> Buy Now
                    </button>
                    <button
                      className="btn btn-outline-secondary px-3"
                      type="button"
                      onClick={() => toggleWishlist(selectedProduct.id)}
                    >
                      <i className={`bi ${wishlist.includes(selectedProduct.id) ? "bi-heart-fill text-danger" : "bi-heart"}`}></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}