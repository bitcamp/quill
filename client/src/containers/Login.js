import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from "react-router";
import BlankPage from '../layouts/BlankPage';
import LoginForm from '../components/LoginForm';

@inject('store')
@observer
@withRouter
class Login extends React.Component {
  handleLogin = (email, password) => {
    console.log("Trying to login user");
    this.props.store.login(email, password, this.props.history);
  }

  handleSignup = (email, password) => {
    console.log("Trying to signup user");
    this.props.store.signup(email, password, this.props.history);
  }

  render() {
    return (
      <BlankPage>
        <LoginForm
          onSubmitLogin={this.handleLogin}
          onSubmitSignup={this.handleSignup}
        />
      </BlankPage>
    )
  }
}

export default Login;
