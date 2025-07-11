import React, {Component} from "react";
import { Link } from "react-router-dom";
import SearchBar from "./search"; 
import { ShoppingCart } from "lucide-react";

class Navbar extends Component {  
    constructor(props) {
        super(props);  
        this.state = {
            isOpen: false,
        };
    } 

    toggleMenu = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));    
    }
    render() {
    return (
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            E-Commerce
          </Link>
          
            {/* Menu Toggle Button */}
            <div className="md:hidden">
            <button onClick={this.toggleMenu} className="text-gray-800 focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {this.state.isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
{/* Desktop Menu */}
<div className="hidden md:flex space-x-6">
  <SearchBar />
  {/* <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
  <Link to="/products" className="text-gray-700 hover:text-primary">Products</Link> */}
  <Link to="/cart" className="text-gray-700 hover:text-primary items-center"><ShoppingCart className="w-8 h-8" /></Link>
</div>

{/* Mobile Menu Overlay */}
{this.state.isOpen && (
  <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-6 text-lg md:hidden">

    {/* Close Button */}
    <button
      className="absolute top-4 right-4 text-gray-600 hover:text-primary focus:outline-none"
      onClick={this.toggleMenu}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    {/* Menu Links */}
    {/* <Link to="/" onClick={this.toggleMenu} className="text-gray-700 hover:text-primary">Home</Link>
    <Link to="/products" onClick={this.toggleMenu} className="text-gray-700 hover:text-primary">Products</Link> */}
    <Link to="/cart" onClick={this.toggleMenu} className="text-gray-700 hover:text-primary"><ShoppingCart className="w-6 h-6" /></Link>
      <SearchBar />

  </div>
)}




        </div>
      </nav>
    );
  }
}

export default Navbar;