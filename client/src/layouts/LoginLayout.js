import React from 'react'
import { Grid, Header, Image } from 'semantic-ui-react'
import Messages from '../containers/Messages';

const gridStyle = { height: '100%' };
const colStyle = { maxWidth: 450 };

class LoginPage extends React.Component {
  render () {
    return (
      <div className='login-form'>
        <Grid textAlign='center' style={gridStyle} verticalAlign='middle'>
          <Grid.Column style={colStyle}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/favicon.ico' /> Login to your account
            </Header>
            <Messages />
            {this.props.children}
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

export default LoginPage;
