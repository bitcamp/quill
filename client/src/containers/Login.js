import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from "react-router";
import BlankPage from '../layouts/BlankPage';
import LoginForm from '../components/LoginForm';

@withRouter
@inject('store')
@observer
class Login extends React.Component {
  handleLogin = (email, password) => {
    this.props.store.login(email, password, this.props.history);
  }

  render() {
    return (
      <BlankPage>
        <LoginForm
          onSubmitLogin={this.handleLogin}
        />
      </BlankPage>
    )
  }
}

export default Login;
