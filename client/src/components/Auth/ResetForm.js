import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Form, Segment, Button } from 'semantic-ui-react';

const DEFAULT_STATE = { newPassword: '', confirmPassword: '' };

class ResetForm extends React.Component {
  state = DEFAULT_STATE;

  handleChange = (_, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    const { newPassword, confirmPassword } = this.state;
    this.props.onSubmit(newPassword, confirmPassword);
    this.setState(DEFAULT_STATE);
  }

  render() {
    const { newPassword, confirmPassword } = this.state;

    return (
      <Form size='large' onSubmit={this.handleSubmit}>
        <Segment>
          <Form.Input
            fluid
            name='newPassword'
            icon='lock'
            iconPosition='left'
            placeholder='New Password'
            type='password'
            value={newPassword}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            name='confirmPassword'
            icon='lock'
            iconPosition='left'
            placeholder='Confirm Password'
            type='password'
            value={confirmPassword}
            onChange={this.handleChange}
          />
          <Button
            fluid
            size='large'
            color='orange'
            content='Reset Password'
          />
          <Divider />
          <Link to='/login'>Back to Login or Dashboard</Link>
        </Segment>
      </Form>
    );
  }
}

export default ResetForm;