import React from 'react';

const AuthContext = React.createContext();

export class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('username') || null,
      token: localStorage.getItem('token') || null,
      userId: localStorage.getItem('userId') || null,
      redirectAfterLogin: null,
    };
  }

  login = (username, token, userId) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);

    this.setState({
      isAuthenticated: true,
      username,
      token,
      userId,
    });
  };

  logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    this.setState({
      isAuthenticated: false,
      username: null,
      token: null,
      userId: null,
      redirectAfterLogin: null,
    });
  };


  setRedirectAfterLogin = (path) => {
    console.log("Setting redirect path:", path);
    this.setState({ redirectAfterLogin: path });
  };

    getRedirectAfterLogin = () => {
    return this.state.redirectAfterLogin;
  };

  clearRedirectAfterLogin = () => {
    this.setState({ redirectAfterLogin: null });
  };



  render() {
    return (
      <AuthContext.Provider
        value={{
          username: this.state.username,
          token: this.state.token,
          userId: this.state.userId,
          login: this.login,
          logout: this.logout,
          setRedirectAfterLogin: this.setRedirectAfterLogin,
          getRedirectAfterLogin: this.getRedirectAfterLogin,
          clearRedirectAfterLogin: this.clearRedirectAfterLogin
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContext;
