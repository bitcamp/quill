import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { inject, observer } from 'mobx-react';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Apply from './Apply';
import Confirm from './Confirm';
import Admin from './Admin';
import Verify from './Verify';
import Forgot from './Forgot';
import Reset from './Reset';
import withHooks from '../util/withHooks';

@inject('store')
@observer
class App extends React.Component {
  noop = () => {};

  ensureAuth = (history) => {
    if (!this.props.store.loggedIn) {
      history.replace('/login');
    }
  }

  ensureAdminAuth = (history) => {
    if (!this.props.store.adminLoggedIn) {
      history.replace('/login');
    }
  }

  ensureNoAuth = (history) => {
    if (this.props.store.loggedIn) {
      history.replace('/');
    }
  }

  clearMessages = () => this.props.store.clearMessages();

  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact        component={withHooks(Home,    this.ensureAuth,      this.clearMessages)} />
          <Route path="/login"         component={withHooks(Login,   this.ensureNoAuth,    this.clearMessages)} />
          <Route path='/signup'        component={withHooks(Signup,  this.ensureNoAuth,    this.clearMessages)} />
          <Route path="/apply"         component={withHooks(Apply,   this.ensureAuth,      this.clearMessages)} />
          <Route path="/confirm"       component={withHooks(Confirm, this.ensureAuth,      this.clearMessages)} />
          <Route path="/admin"         component={withHooks(Admin,   this.ensureAdminAuth, this.clearMessages)} />
          <Route path="/verify/:token" component={withHooks(Verify,  this.noop,            this.clearMessages)} />
          <Route path="/forgot"        component={withHooks(Forgot,  this.noop,            this.clearMessages)} />
          <Route path="/reset/:token"  component={withHooks(Reset,   this.noop,            this.clearMessages)} />
        </div>
      </Router>
    );
  }
}

export default App;
