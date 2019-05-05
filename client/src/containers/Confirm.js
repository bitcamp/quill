import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import Page from '../layouts/Page';
import ConfirmationForm from '../components/Confirm/ConfirmationForm';
import ActionModal from '../components/ActionModal';

@withRouter
@inject('store')
@observer
class Confirm extends React.Component {
  state = { showModal: false }

  updateConfirmation = async (confirmation) => {
    console.log('trying to update confirmation');
    const success = await this.props.store.updateConfirmation(confirmation);

    if (success) {
      this.setState({ showModal: true });
    }
  }

  goToDashboard = () => this.props.history.push('/');
  
  render() {
    const { confirmation } = this.props.store.user;

    return (
      <Page title="Confirm">
        <ActionModal
          as='span'
          open={this.state.showModal}
          header='Awesome!'
          content='You have confirmed your attendance at Bitcamp'
          action={this.goToDashboard}
        />
        <ConfirmationForm
          oldConfirmation={confirmation}
          onSubmit={this.updateConfirmation}
        />
      </Page>
    );
  }
}

export default Confirm;
