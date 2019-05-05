import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Form, Segment, Button } from 'semantic-ui-react';

const DEFAULT_STATE = { email: '' };

class ForgotForm extends React.Component {
  state = DEFAULT_STATE;

  handleChange = (_, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    const { email } = this.state;
    this.props.onSubmit(email);
    this.setState(DEFAULT_STATE);
  }

  render() {
    return (
      <Form size='large' onSubmit={this.handleSubmit}>
        <Segment>
          <Form.Input
            fluid
            name='email'
            icon='user'
            iconPosition='left'
            placeholder='E-mail address'
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Button
            fluid
            size='large'
            color='orange'
            content='Send Reset Email'
          />
          <Divider />
          <Link to='/login'>Login</Link>
        </Segment>
      </Form>
    );
  }
}

export default ForgotForm;