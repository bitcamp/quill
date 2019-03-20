import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import Page from '../layouts/Page';
import Dashboard from '../components/Dashboard';
import ActionModal from '../components/ActionModal';

@withRouter
@inject('store')
@observer
class Home extends React.Component {
  state = { showDeclineModal: false }

  resendVerification = async () => {
    this.props.store.resendVerificationEmail();
  }

  decline = () => {
    this.props.store.decline();
    this.setState({ showDeclineModal: false });
  }

  render() {
    if (!this.props.store.loggedIn) {
      return null;
    }


    const { user } = this.props.store;
    
    const status = user.status.name.toUpperCase();
    const name = user.status.completedProfile 
      ? `${user.profile.firstName} ${user.profile.lastName}`
      : user.email;

    const userData = {
      status,
      name,
    }

    let dashboardProps = { };

    if (user.status.name === 'unverified') {
      dashboardProps = {
        title: 'You need to verify your email address',
        message: 'You should have received an email asking you to verify your email. '
          + 'Click the link in the email and you can start your application!',
        showButton: true,
        buttonContent: 'Resend Verification Email',
        buttonAction: this.resendVerification,
      };
    } else if (user.status.name === 'incomplete') {
      dashboardProps = {
        title: 'You still need to complete your application!',
        message: 'Please complete your application to be considered for Bitcamp.',
        showButton: true,
        buttonContent: 'Apply Now',
        buttonAction: () => this.props.history.push('/apply'),        
      };
    } else if (user.status.name === 'submitted') {
      dashboardProps = {
        title: 'Your application has been submitted!',
        message: 'Feel free to edit it at any time. '
          + 'Admissions will be determined on a rolling basis. '
          + 'Please make sure your information is up to date and accurate!',
        showButton: true,
        buttonContent: 'Update Your Application',
        buttonAction: () => this.props.history.push('/apply'),
      };
    } else if (user.status.name === 'admitted') {
      dashboardProps = {
        title: 'You need to confirm your attendance',
        showButton: true,
        buttonContent: [
          'Confirm Your Spot', 
          'Can\'t make it?'
        ],
        buttonAction: [
          () => this.props.history.push('/confirm'),
          () => this.setState({ showDeclineModal: true }),
        ],
      };
    } else if (user.status.name === 'confirmed') {
      dashboardProps = {
        title: 'You have confirmed your attendance at Bitcamp 2019',
        message: 'No further action is necessary',
        showButton: true,
        buttonContent: "Can't make it?",
        buttonAction: () => this.setState({ showDeclineModal: true }),
      };
    } else if (user.status.name === 'declined') {
      dashboardProps = {
        title: 'You have declined your attendance at Bitcamp 2019',
        message: "We hope you'll make it to Bitcamp 2020!",
        showButton: false,
      };
    }

    return (
      <Page title="Dashboard">
        <ActionModal
          as='span'
          open={this.state.showDeclineModal}
          header='Are you sure?'
          content="Once you decline, you will not be able to attend"
          action={this.decline}
        />
        <Dashboard 
          userData={userData}
          {...dashboardProps}
        />
      </Page>
    );
  }
}

export default Home;
