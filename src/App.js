import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Cart from './pages/cart';
import Order from './pages/order';
import { Routes, Route } from 'react-router-dom';
import ProductDetail from './components/Productdetail';
import { AuthProvider } from './context/Authcontext';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <AuthProvider>
      <div className="min-h-screen bg-background text-text">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
        </Routes>
        <Footer />
      </div>
      </AuthProvider>
    );
  }
}

export default App;
