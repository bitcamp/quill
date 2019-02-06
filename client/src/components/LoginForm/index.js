import React from 'react';
import { Form, Segment, Button, Divider } from 'semantic-ui-react';

class LoginForm extends React.Component {
  state = { email: '', password: '' };

  handleChange = (_, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleLogin = () => {
    const { email, password } = this.state;
    this.props.onSubmitLogin(email, password);
  }

  handleSignup = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.onSubmitSignup(email, password);
  }

  render () {
    return (
      <Form size='large' onSubmit={this.handleLogin}>
        <Segment>
          <Form.Input 
            fluid
            name='email'
            icon='user'
            iconPosition='left'
            placeholder='E-mail address'
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            name='password'
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={this.handleChange}
          />
          <Button color='orange' fluid size='large' content="Login" />
          <Divider horizontal content="Or" />
          <Button color='blue' fluid size='large' content="Signup" onClick={this.handleSignup} />
        </Segment>
      </Form>
    );
  }
}

export default LoginForm;
