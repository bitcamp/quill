import React from 'react';
import { Link } from 'react-router-dom';
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
          <Divider horizontal content='or' />
          <Link to='/signup'>Sign Up!</Link><br /><br />
          <Link to='/forgot'>Forgot Password?</Link>
        </Segment>
      </Form>
    );
  }
}

export default LoginForm;
