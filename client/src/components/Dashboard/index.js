import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

export default class Dashboard extends React.Component {
  render() {
    const { user } = this.props;
    const userName = user.email;
    const userStatus = user.status ? user.status.name : "";

    return (
      <Segment>
        <Header as='h3'>Welcome, {userName}</Header>
        <Header as='h3'>Status: {userStatus}</Header>
      </Segment>
    )
  }
}
