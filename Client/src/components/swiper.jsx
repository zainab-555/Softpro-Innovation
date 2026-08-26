
import img1 from '../assets/1.jpeg';
import img2 from '../assets/2.jpeg';
import img3 from '../assets/3.jpeg';
import img4 from '../assets/4.jpeg';
import img5 from '../assets/5.jpeg';
import img6 from '../assets/6.jpeg';
import img7 from '../assets/7.jpeg';
import img8 from '../assets/8.jpeg';
import img9 from '../assets/9.jpeg';
import img10 from '../assets/10.jpeg';

const categories = [
  { id: 1, name: 'Microcontrollers', img: img1 },
  { id: 2, name: 'Sensors', img: img2 },
  { id: 3, name: 'Indicators', img: img3 },
  { id: 4, name: 'Motors', img: img4 },
  { id: 5, name: 'Communication Modules', img: img5 },
  { id: 6, name: 'Battery Components', img: img6 },
  { id: 7, name: 'Development Boards', img: img7 },
  { id: 8, name: 'Displays', img: img8 },
  { id: 9, name: 'Actuators', img: img9 },
  { id: 10, name: 'Power Components', img: img10 },
];

const CategoryGrid = () => {
  return (
    <section className="category-section py-5">
      <div className="container">
        <span className="category-subtitle">BROWSE BY TYPE</span>
        <h2 className="category-heading mt-1 mb-2">
          Popular <span className="text-orangered fst-italic">Categories</span>
        </h2>
        <p className="category-text text-muted mb-4">
          Find exactly what your project needs from our curated electronics families.
        </p>

        <div className="row g-3">
          {categories.map((cat) => (
            <div className="col-6 col-md-3" key={cat.id}>
              <div className="category-card text-center p-4">
                <div className="category-img-wrapper mb-3 mx-auto d-flex align-items-center justify-content-center">
                  <img src={cat.img} alt={cat.name} className="img-fluid category-img" />
                </div>
                <h6 className="category-card-title mb-0">{cat.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;