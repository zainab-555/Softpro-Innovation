import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import About from './About';
import Category from './components/Category';
import CategoryForm from './components/CategoryForm';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Contact from './Contact';
import Home from './Home';
import Admin from './pages/admin/Admin';
import AdminComplaints from './pages/admin/AdminComplaints';
import AdminHome from './pages/admin/AdminHome';
import AdminInventory from './pages/admin/AdminInventory';
import AdminLogin from './pages/admin/AdminLogin';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProduct from './pages/admin/Product';
import ProductForm from './pages/admin/ProductForm';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import StoreProduct from './Product';
import Registering from './Registering';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="animated-background" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Product" element={<StoreProduct />} />
          <Route path="/products" element={<StoreProduct />} />
          <Route path="/cart" element={<><Header /><Cart /></>} />
          <Route path="/checkout" element={<><Header /><Checkout /></>} />
          <Route path="/wishlist" element={<><Header /><Wishlist /></>} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Registering" element={<Registering />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/userdashboard" element={<Dashboard />} />
          {/* Alias /dashboard to /admin */}
          <Route path="/dashboard" element={<Navigate to="/admin" replace />} />

          {/* Admin Nested Routes */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminHome />} />
            <Route path="overview" element={<AdminHome />} />
            <Route path="categories" element={<Category />} />
            <Route path="categories/add" element={<CategoryForm />} />
            <Route path="categories/edit/:id" element={<CategoryForm />} />
            <Route path="products" element={<AdminProduct />} />
            <Route path="products/add" element={<ProductForm />} />
            <Route path="products/edit/:id" element={<ProductForm />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="complaints" element={<AdminComplaints />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;