import React from 'react';
import { Header, Segment, Divider, Message, Button } from 'semantic-ui-react';

export default class Dashboard extends React.Component {
  render() {
    const { userData, title, message, showButton, buttonContent, buttonAction } = this.props;
    const { status, name } = userData;

    const button = this.props.showButton
      ? <Button color='orange' content={buttonContent} onClick={buttonAction} />
      : null;

    return (
      <Segment padded>
        <Header as='h4' textAlign='center' style={{fontFamily: 'monospace'}}>YOUR STATUS:</Header>
        <Message color='blue'>
          <Header as='h2' textAlign='center'>{status}</Header>
        </Message>
        <Divider />
        <Header as='h3' textAlign='center'>Welcome, {name}</Header>
        <Header as='h3' textAlign='center'>{title}</Header>
        <Header as='h5'>{message}</Header>
        <Header as='h5' textAlign='center'>{button}</Header>
      </Segment>
    )
  }
}
