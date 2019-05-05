import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import BlankPage from '../layouts/BlankPage';
import ResetForm from '../components/Auth/ResetForm';
import ActionModal from '../components/ActionModal';

const DEFAULT_STATE = { showModal: false };

@withRouter
@inject('store')
@observer
class Reset extends React.Component {
  state = DEFAULT_STATE;

  resetPassword = async (newPassword, confirmPassword) => {
    const tempToken = this.props.match.params.token;
    const success = await this.props.store.resetPassword(tempToken, newPassword, confirmPassword);
    
    if (success) {
      this.setState({ showModal: true });
    }
  }

  logout = () => this.props.store.logout(this.props.history);

  render() {
    return (
      <BlankPage>
        <ActionModal
          as='span'
          open={this.state.showModal}
          header="Password Reset!"
          content='Please login again'
          action={this.logout}
        />
        <ResetForm onSubmit={this.resetPassword} />;
      </BlankPage>
    );
  }
}

export default Reset;
