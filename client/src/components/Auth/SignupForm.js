import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Segment, Button, Divider } from 'semantic-ui-react';

class SignupForm extends React.Component {
  state = { email: '', password: '' };

  handleChange = (_, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleSignup = () => {
    const { email, password } = this.state;
    this.props.onSubmitSignup(email, password);
  }

  render () {
    return (
      <Form size='large' onSubmit={this.handleSignup}>
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
          <Button color='blue' fluid size='large' content="Signup" />
          <Divider />
          <Link to='/login'>Login</Link>
        </Segment>
      </Form>
    );
  }
}

export default SignupForm;
