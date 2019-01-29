import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from "react-router";
import { Header } from 'semantic-ui-react';
import Messages from '../../containers/Messages';
import SideNav from './SideNav';
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
    return (
      <div style={{minHeight: '100vh', height: 0}} >
        <div className="pageNav">
          <SideNav isAdmin canConfirm handleLogout={this.handleLogout} />
        </div>
        <div className="pageContent">
          <Header as='h1' dividing textAlign='center' content={this.props.title} />
          <Messages />
          {this.props.children}
        </div>
      </div>
    )
  }
}
