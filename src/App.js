import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/home';
import { Routes, Route } from 'react-router-dom';
import ProductDetail from './components/Productdetail';

class App extends Component {
  render() {
    return (
      <div className="min-h-screen bg-background text-text">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    );
  }
}

export default App;
