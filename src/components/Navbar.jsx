import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./search";
import { ShoppingCart, User, LogOut, PackageCheck } from "lucide-react";
import AuthContext from "../context/Authcontext";
import { withRouter } from "../utils/withRouter";

class Navbar extends Component {
  static contextType = AuthContext;
  

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      showDropdown: false,
    };
  }

  toggleMenu = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ isOpen: false });
    }
  }

  handleClickOutside = (event) => {
    if (this.dropdownRef && !this.dropdownRef.contains(event.target)) {
      this.setState({ showDropdown: false });
    }
  };


  handleLogout = () => {
    this.context.logout();
    this.setState({ isOpen: false , showDropdown: false});
    this.props.navigate("/login");
  };

  handleCartClick = () => {
    const { token, setRedirectAfterLogin } = this.context;

    if (token) {
      this.props.navigate('/cart');
    } else {
      setRedirectAfterLogin('/cart');
      this.props.navigate('/login');
    }
  };


  render() {
    const { username } = this.context;
    const { pathname } = this.props.location;
    const isAuthPage = pathname === '/login' || pathname === '/register';
  


    return (
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/?reset=true" className="text-2xl font-bold text-primary">
            E-Commerce
          </Link>

            {!isAuthPage && (
            <>
              <div className="md:hidden">
                <button
                  onClick={this.toggleMenu}
                  className="text-gray-800 focus:outline-none"
                >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                {this.state.isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>


          <div className="hidden md:flex space-x-6 items-center">
            <SearchBar />
            <ShoppingCart onClick={this.handleCartClick} className="text-gray-700 hover:text-primary"/>
            {username ? (
              <div className="relative" ref={(node) => (this.dropdownRef = node)}>
              <div
                onClick={() => this.setState(prev => ({ showDropdown: !prev.showDropdown }))}
                className="flex flex-col items-center justify-center text-sm text-gray-700 cursor-pointer"
              >
              <span className="text-xs text-gray-500 -mb-1">Hello</span>
              <span className="text-base font-semibold text-primary">{username}</span>
              </div>

  
              {this.state.showDropdown && (
                <div className="absolute top-10 right-0 bg-white border rounded shadow-lg z-10 w-32 flex flex-col items-center">
                  <button
                    onClick={() => {
                    this.setState({ showDropdown: false });
                    this.props.navigate('/order');
                    }}
                    className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Your Orders
                  </button>
                  <button
                    onClick={this.handleLogout}
                    className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                  </div>
              )}
                </div>
                ) : (
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-primary items-center"
                  >
                    <User className="w-6 h-6" />
                  </Link>
                )}
          </div>

          {/* Mobile Menu Overlay */}
          {this.state.isOpen && (
            <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center
             space-y-6 text-lg md:hidden">
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

              {/* Mobile Links */}
              {username ? (
                <>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-lg font-semibold text-primary">
                      {username}
                    </span>
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={this.toggleMenu}
                  className="text-gray-700 hover:text-primary"
                >
                  <User className="w-8 h-8" />
                </Link>
              )}
              <div className="relative">
                <Link
                  to="/cart"
                  onClick={() => {this.toggleMenu();this.handleCartClick();}}
                  className="text-gray-700 hover:text-primary"
                >
                  <ShoppingCart className="w-8 h-8" />
                </Link>
              </div>

              {username && (
                <Link
                  to="/order"
                  onClick={this.toggleMenu}
                  className="text-gray-700 hover:text-primary"
                >
                  <PackageCheck className="w-8 h-8" />
                </Link>
              )}

              <SearchBar />
              {username && (
                <button
                  onClick={() => {
                  this.toggleMenu();
                  this.handleLogout();
              }}
                  className="text-gray-700 hover:text-red-600"
                >
                  <LogOut className="w-8 h-8" />
                </button>
              )}
            </div>
          )}
                    </>
          )}
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
