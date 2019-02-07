import React from 'react'
import { Grid, Header, Image } from 'semantic-ui-react'
import Messages from '../containers/Messages';
import Loading from '../containers/Loading';
import logo from '../images/logo.svg';

const gridStyle = { height: '100%' };
const colStyle = { maxWidth: 450 };

class BlankPage extends React.Component {
  render () {
    const header = this.props.title
      ? <Header as='h1' color='black' textAlign='center' content={this.props.title} />
      : null;
    return (
      <div className='login-form'>
        <Loading />
        <Grid textAlign='center' style={gridStyle} verticalAlign='middle'>
          <Grid.Column style={colStyle}>
            <Image size='small' centered src={logo} /> <br />
            {header}
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

export default BlankPage;
