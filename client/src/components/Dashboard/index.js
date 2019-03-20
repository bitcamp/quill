import React from 'react';
import { Header, Segment, Message, Button } from 'semantic-ui-react';

export default class Dashboard extends React.Component {
  render() {
    const { userData, title, message, showButton, buttonContent, buttonAction } = this.props;
    const { status, name } = userData;

    // TODO: Refactor this mess
    let buttons;
    if (Array.isArray(buttonContent)) {
      console.log('array');
      const buttonEles = buttonContent.map((content, i) => (
        <Button color='orange' content={content} onClick={buttonAction[i]} />
      ));
      buttons = (<Header as='h5' textAlign='center'>{buttonEles}</Header>);
    } else {
      const button = showButton
        ? <Button color='orange' content={buttonContent} onClick={buttonAction} />
        : null;
      buttons = (<Header as='h5' textAlign='center'>{button}</Header>);
    }


    return (
      <Segment padded>
        <Header as='h3' textAlign='center'>Welcome, {name}</Header>
        <Header as='h4' textAlign='center' style={{fontFamily: 'monospace'}}>YOUR STATUS</Header>
        <Message color='blue'>
          <Header as='h2' textAlign='center'>{status}</Header>
        </Message>
        <Header as='h4' textAlign='center'>{title}</Header>
        <Header as='h5' textAlign='center'>{message}</Header>
        {buttons}
      </Segment>
    )
  }
}
