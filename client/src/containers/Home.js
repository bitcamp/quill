import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import Page from '../layouts/Page';
import Dashboard from '../components/Dashboard';

@withRouter
@inject('store')
@observer
class Home extends React.Component {

  resendVerification = async () => {
    this.props.store.resendVerificationEmail();
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
    }

    return (
      <Page title="Dashboard">
        <Dashboard 
          userData={userData}
          {...dashboardProps}
        />
      </Page>
    );
  }
}

export default Home;
