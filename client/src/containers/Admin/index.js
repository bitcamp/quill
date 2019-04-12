import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminPage from '../../layouts/AdminPage';
import AdminNav from '../../components/AdminNav';
import AdminStatistics from './AdminStatistics';
import AdminUsers from './AdminUsers';
import AdminSettings from './AdminSettings';

@withRouter
@inject('store')
@observer
class Admin extends React.Component {
  render() {
    const activePage = 'stats';
    console.log(this.props);

    return (
      <AdminPage>
        <Router>
          <div>
            <AdminNav 
              activePage={activePage}
              pushHistory={(destination) => this.props.history.push(destination)}
            />
            <Switch>
              <Route exact path='/admin'    component={AdminStatistics} />
              <Route path='/admin/stats'    component={AdminStatistics} />
              <Route path='/admin/users'    component={AdminUsers}      />
              <Route path='/admin/settings' component={AdminSettings}   />
            </Switch>
          </div>
        </Router>
      </AdminPage>
    );
  }
}

export default Admin;
