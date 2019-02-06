import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from "react-router";
import Page from '../layouts/BlankPage';

const REDIRECT_DELAY = 3000; // ms

@inject('store')
@observer
@withRouter
class Verify extends React.Component {
  state = { message: "Verifying..." }

  _processVerification = async (verifyToken) => {
    const verifyOk = await this.props.store.verify(verifyToken, this.props.history);
    if (verifyOk && this.props.store.loggedIn) {
      this.setState({ message: "Your email has been verified, redirecting to dashboard..."});
      setTimeout(() => this.props.history.push('/'), REDIRECT_DELAY);
    } else if (verifyOk) {
      this.setState({ message: "Your email has been verified, please log in"});
      setTimeout(() => this.props.history.push('/login'), REDIRECT_DELAY);
    } else {
      this.setState({ message: "Failed to verify email" });
    }
  }

  componentDidMount() {
    const verifyToken = this.props.match.params.token;
    this._processVerification(verifyToken);
  }

  render() {
    return (
      <Page title="Verifying User">
        {this.state.message}
      </Page>
    );
  }
}

export default Verify;
