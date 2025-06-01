import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Product from '../pages/Product';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import CategoryProducts from '../pages/CategoryProducts';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import Orders from '../pages/Orders';
import OrderDetails from '../pages/OrderDetails';
import Wishlist from '../pages/Wishlist';
import Profile from '../pages/Profile';
import ManageAddresses from '../pages/ManageAddresses';
import TrackOrder from '../pages/TrackOrder';
import FAQ from '../pages/FAQ';
import Contact from '../pages/Contact';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import Shipping from '../pages/Shipping';
import Returns from '../pages/Returns';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:category" element={<CategoryProducts />} />
      <Route path="/products/:category/:subcategory" element={<CategoryProducts />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/track-order" element={<TrackOrder />} />
      <Route path="/faqs" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/returns" element={<Returns />} />

      {/* Protected Routes */}
      <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
      <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/addresses" element={<ProtectedRoute><ManageAddresses /></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;