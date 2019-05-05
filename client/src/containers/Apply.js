import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import Page from '../layouts/Page';
import ApplicationForm from '../components/Apply/ApplicationForm';
import ActionModal from '../components/ActionModal';

@withRouter
@inject('store')
@observer
class Apply extends React.Component {
  state = { showModal: false }

  updateProfile = async (profile) => {
    console.log('trying to update profile');
    const success = await this.props.store.updateProfile(profile);

    if (success) {
      this.setState({ showModal: true });
    }
  }

  goToDashboard = () => this.props.history.push('/');

  render() {
    const { profile } = this.props.store.user;
    return (
      <Page title="Application">
        <ActionModal
          as='span'
          open={this.state.showModal}
          header='Awesome!'
          content='Your application has been submitted'
          action={this.goToDashboard}
        />
        <ApplicationForm
          oldProfile={profile}
          schoolOptions={this.props.store.schoolOptions}
          onSubmit={this.updateProfile}
        />
      </Page>
    );
  }
}

export default Apply;
