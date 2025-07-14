import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from '../utils/withRouter';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false,
    };
  }

  handleFakeRegister = (e) => {
    e.preventDefault();
    this.setState({ showMessage: true });
  };

  render() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-center text-primary mb-6">Register</h2>

          {this.state.showMessage && (
            <div className="text-center text-sm text-blue-600 mb-4 bg-blue-50 p-3 rounded border border-blue-300">
              🚧 This project is for educational/demo purposes only.<br />
              Account creation is currently disabled.<br /><br />
              <span className="font-semibold">Use the test credentials to explore:</span><br />
              <span className="text-gray-800 font-mono">Username: <strong>test</strong></span><br />
              <span className="text-gray-800 font-mono">Password: <strong>guestuser</strong></span><br /><br />
              <Link to="/login" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition">
                Go to Login →
              </Link>
            </div>
          )}

          {!this.state.showMessage && (
            <form onSubmit={this.handleFakeRegister} className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition"
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
