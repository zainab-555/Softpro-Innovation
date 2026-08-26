import bannerImg from "../assets/banner.jpeg"
import banner2Img from "../assets/banner2.jpeg"
const Hero = () => {
    return (
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div
                        className="hero-slide d-flex align-items-center"
                        style={{ backgroundImage: `url(${bannerImg})` }}>
                        <div className="hero-overlay"></div>
                        <div className="container position-relative">
                            <span className="badge-new">NEW ARRIVAL 2025</span>
                            <h1 className="hero-heading">
                                Power Your<span className="text-orangered fst-italic"> Next</span> Big Project
                            </h1>
                            <p className="hero-text">
                                Explore Raspberry Pi 5, Arduino R4, ESP32-S3 boards and over
                                5,000 components. Fast shipping across India.
                            </p>
                            <div className="d-flex gap-3">
                                <button className="btn btn-orangered">Shop Now</button>
                                <button className="btn btn-outline-light-custom">View Catalog</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-item active">
                    <div
                        className="hero-slide d-flex align-items-center"
                        style={{ backgroundImage: `url(${banner2Img})` }}>
                        <div className="hero-overlay"></div>
                        <div className="container position-relative">
                            <span className="badge-new">NEW ARRIVAL 2025</span>
                            <h1 className="hero-heading">
                                Power Your<span className="text-orangered fst-italic"> Next</span> Big Project
                            </h1>
                            <p className="hero-text">
                                Explore Raspberry Pi 5, Arduino R4, ESP32-S3 boards and over
                                5,000 components. Fast shipping across India.
                            </p>
                            <div className="d-flex gap-3">
                                <button className="btn btn-orangered">Shop Now</button>
                                <button className="btn btn-outline-light-custom">View Catalog</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-item active">
                    <div
                        className="hero-slide d-flex align-items-center"
                        style={{ backgroundImage: `url(${banner2Img})` }}>
                        <div className="hero-overlay"></div>
                        <div className="container position-relative">
                            <span className="badge-new">NEW ARRIVAL 2025</span>
                            <h1 className="hero-heading">
                                Power Your<span className="text-orangered fst-italic"> Next</span> Big Project
                            </h1>
                            <p className="hero-text">
                                Explore Raspberry Pi 5, Arduino R4, ESP32-S3 boards and over
                                5,000 components. Fast shipping across India.
                            </p>
                            <div className="d-flex gap-3">
                                <button className="btn btn-orangered">Shop Now</button>
                                <button className="btn btn-outline-light-custom">View Catalog</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                <span className="hero-arrow">
                    <i className="bi bi-chevron-left"></i>
                </span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                <span className="hero-arrow">
                    <i className="bi bi-chevron-right"></i>
                </span>
            </button>

            <div className="carousel-indicators">
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
            </div>

            <div className="stats-bar">
                <div className="row text-center g-0">
                    <div className="col-6 col-md-3 stat-item">
                        <h2>5,000+</h2>
                        <p>Components</p>
                    </div>
                    <div className="col-6 col-md-3 stat-item">
                        <h2>98%</h2>
                        <p>Satisfaction</p>
                    </div>
                    <div className="col-6 col-md-3 stat-item">
                        <h2>24hr</h2>
                        <p>Fast Dispatch</p>
                    </div>
                    <div className="col-6 col-md-3 stat-item">
                        <h2>50,000+</h2>
                        <p>Happy Customers</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero