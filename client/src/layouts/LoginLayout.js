import React from 'react'
import { Button, Divider, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'

const gridStyle = { height: '100%' };
const colStyle = { maxWidth: 450 };

export default class LoginPage extends React.Component {
  state = { email: '', password: '' };

  handleChange = (_, { name, value }) => this.setState({ [name]: value });

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
      <div className='login-form'>
        <Grid textAlign='center' style={gridStyle} verticalAlign='middle'>
          <Grid.Column style={colStyle}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/favicon.ico' /> Login to your account
            </Header>
            <Form size='large' onSubmit={this.handleLogin}>
              <Segment stacked>
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
                <Button color='teal' fluid size='large' content="Login" />
                <Divider horizontal content="Or" />
                <Button color='green' fluid size='large' content="Signup" onClick={this.handleSignup} />
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>

        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
      </div>
    );
  }
}