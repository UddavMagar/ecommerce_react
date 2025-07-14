import React, { Component } from 'react';
import axios from 'axios';
import AuthContext from '../context/Authcontext';
import { Navigate } from 'react-router-dom';
import { withRouter } from '../utils/withRouter';
import { Link } from 'react-router-dom';

class Login extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      redirect: false,
    };
  }

componentDidMount() {

  if (this.context.username && this.context.redirectAfterLogin) {
    this.context.setRedirectAfterLogin(null);
  }
}

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: '' });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { login } = this.context;

    try {
      const response = await axios.post(
        'https://uddavmagar.pythonanywhere.com/user-login/',
        { username, password }
      );
      console.log(response.data);
      const { token, username: backendUsername, id: user_id } = response.data;
      console.log(token, backendUsername, user_id);
      if (token && backendUsername && user_id) {
        console.log(token, backendUsername, user_id);
        login(backendUsername, token, user_id);
        const redirectPath = this.context.getRedirectAfterLogin() || '/';
        this.context.clearRedirectAfterLogin();
        this.setState({ redirect: redirectPath });
      } else {
        this.setState({ error: 'Invalid response from server' });
        //console.log('Log error', error)
      }
    } catch (err) {
      this.setState({ error: 'Login failed. Check credentials.' });
      console.error('Login error:', err);
    }
  };

  render() {
    if (this.state.redirect) return <Navigate to={this.state.redirect} />;
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-center text-primary mb-6">Login</h2>
          {this.state.error && (
            <div className="text-red-500 text-sm mb-4 text-center">
              {this.state.error}
            </div>
          )}
          <form onSubmit={this.handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition"
            >
              Login
            </button>
          </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
                 Register
              </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
