import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from "react-router";
import BlankPage from '../layouts/BlankPage';
import SignupForm from '../components/Auth/SignupForm';

@withRouter
@inject('store')
@observer
class Login extends React.Component {
  handleSignup = (email, password) => {
    this.props.store.signup(email, password, this.props.history);
  }

  render() {
    return (
      <BlankPage>
        <SignupForm
          onSubmitSignup={this.handleSignup}
        />
      </BlankPage>
    )
  }
}

export default Login;
