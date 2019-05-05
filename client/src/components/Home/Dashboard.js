import React from 'react';
import { Header, Segment, Message, Button } from 'semantic-ui-react';

class Dashboard extends React.Component {
  render() {
    const { userData, title, message, showButton, buttonContent, buttonAction, showReimbursement = true} = this.props;
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

    // TODO: Refactor this mess too
    let reimbursementMessage;
    if (userData.reimbursementLimit && userData.reimbursementLimit !== 0) {
      reimbursementMessage = `You have been approved for travel reimbursement up to $${userData.reimbursementLimit.toFixed(2)}`;
    } else {
      reimbursementMessage = "You are not approved for travel reimbursement";
    }

    return (
      <Segment padded>
        <Header as='h3' textAlign='center'>Welcome, {name}</Header>
        <Header as='h4' textAlign='center' style={{fontFamily: 'monospace'}}>YOUR STATUS</Header>
        <Message color='blue'>
          <Header as='h2' textAlign='center'>{status}</Header>
        </Message>
        {
          showReimbursement
          ? <Message color='yellow'><Header as='h3' textAlign='center'>{reimbursementMessage}</Header></Message>
          : null
        }
        <Header as='h4' textAlign='center'>{title}</Header>
        <Header as='h5' textAlign='center'>{message}</Header>
        {buttons}
      </Segment>
    )
  }
}

export default Dashboard;