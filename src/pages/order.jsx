import React, { Component } from 'react';
import { Navigate,Link } from 'react-router-dom';
import AuthContext from '../context/Authcontext';
import { withRouter } from '../utils/withRouter';
import { Home } from 'lucide-react';

class Order extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin: false,
    };
  }

  componentDidMount() {
    const { token, setRedirectAfterLogin } = this.context;

    if (!token) {
      setRedirectAfterLogin('/order');
      this.setState({ redirectToLogin: true });
    }
  }

  render() {
    const { state } = this.props.location || {};
    const orderedItems = state?.orderedItems;

    if (this.state.redirectToLogin) {
      return <Navigate to="/login" />;
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 text-center">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        

        {orderedItems ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center text-primary">Your Order</h2>
            <p className="text-gray-700 mb-2 text-center">
              You’ve placed an order for the following items:
            </p>
            <ul className="bg-gray-100 p-4 rounded">
              {orderedItems.map((item, index) => (
                <li key={index} className="py-1 border-b last:border-b-0">
                  <span className="font-medium">{item.name}</span> — Quantity: {item.quantity}
                </li>
              ))}
            </ul>
            <p className="text-sm text-red-500 text-center mt-6">
              ⚠️ Note: This is an educational project. No actual payment or order processing is implemented.
            </p>
                      <p className="text-gray-500 mb-4">
            You can still explore the website.
          </p>
          <Link to="/" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition">
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </Link>
          </div>
        ) : (
 <>
          <h2 className="text-2xl font-bold text-primary mb-4">Warning</h2>
          <p className="text-gray-700 mb-6">
           ⚠️  This is a portfolio project created for <strong>educational purposes</strong>. <br />
            Order and payment systems are not enabled.
          </p>
          <p className="text-gray-500 mb-4">
            You can still explore the website.
          </p>
          <Link to="/" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition">
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </Link>
          </>
        )}
      </div>
      </div>
    );
  }
}

export default withRouter(Order);
