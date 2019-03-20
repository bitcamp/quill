import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from "react-router";
import { Container, Header, Segment } from 'semantic-ui-react';
import Messages from '../../containers/Messages';
import Loading from '../../containers/Loading';
import SideNav from './SideNav';
import TopNav from './TopNav';
import './index.css';

@inject('store')
@observer
@withRouter
export default class PageLayout extends React.Component {
  handleLogout = () => {
    console.log("Trying to logout user");
    this.props.store.logout(this.props.history);
  }

  render() {
    const isAdmin = this.props.store.adminLoggedIn;
    const canApply = this.props.store.user.verified || isAdmin;
    const canConfirm = this.props.store.user.status.admitted && !this.props.store.user.status.declined || isAdmin;

    return (
      <div style={{minHeight: '100vh', height: 0, minWidth: '100vh'}} >
        <div className='topNav'>
          <TopNav
            isAdmin={isAdmin}
            canApply={canApply}
            canConfirm={canConfirm}
            handleLogout={this.handleLogout}
          />
        </div>
        <div className="pageNav">
          <SideNav 
            isAdmin={isAdmin}
            canApply={canApply}
            canConfirm={canConfirm}
            handleLogout={this.handleLogout}
          />
        </div>
        <div className="pageContent">
          <Container>
            <Loading />
            <Segment basic padded='very' style={{paddingTop: 16, paddingBottom: 2}}>
              <Header as='h1' dividing textAlign='center' content={this.props.title} />
            </Segment>
            <Segment basic padded='very'>
              <Messages />
              {this.props.children}
            </Segment>
          </Container>
        </div>
      </div>
    )
  }
}
