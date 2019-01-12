import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from "react-router";
import LoginLayout from '../layouts/LoginLayout';

@inject('store')
@observer
@withRouter
class Login extends React.Component {
  componentDidMount() {
    if (this.props.store.loggedIn) {
      this.props.history.replace("/");
    }
  }

  handleLogin = (email, password) => {
    console.log("Trying to login user");
    this.props.store.login(email, password, this.props.history);
  }

  handleSignup = (email, password) => {
    console.log("Trying to signup user");
  }

  render() {
    return <LoginLayout onSubmitLogin={this.handleLogin} onSubmitSignup={this.handleSignup} />
  }
}

export default Login;
