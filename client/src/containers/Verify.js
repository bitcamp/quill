import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from "react-router";
import BlankPage from '../layouts/BlankPage';
import { promiseSleep } from '../util';

const REDIRECT_DELAY = 3000; // ms
const DEFAULT_STATE = { message: "Verifying..." };

@withRouter
@inject('store')
@observer
class Verify extends React.Component {
  state = DEFAULT_STATE;

  _processVerification = async (verifyToken) => {
    const success = await this.props.store.verify(verifyToken, this.props.history);

    if (success && this.props.store.loggedIn) {
      this.setState({ message: "Your email has been verified, redirecting to dashboard..."});
      await promiseSleep(REDIRECT_DELAY);
      this.props.history.push('/');
    } else if (success) {
      this.setState({ message: "Your email has been verified, please log in"});
      await promiseSleep(REDIRECT_DELAY);
      this.props.history.push('/login');
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
      <BlankPage title="Verifying User">
        {this.state.message}
      </BlankPage>
    );
  }
}

export default Verify;
