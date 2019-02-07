import React from 'react';
import { inject, observer } from 'mobx-react';
import BlankPage from '../layouts/BlankPage';
import ForgotForm from '../components/ForgotForm';

@inject('store')
@observer
class Forgot extends React.Component {
  sendResetEmail = (email) => {
    this.props.store.sendPasswordResetEmail(email);
  }
  
  render() {
    return (
      <BlankPage>
        <ForgotForm onSubmit={this.sendResetEmail} />
      </BlankPage>
    )
  }
}

export default Forgot;