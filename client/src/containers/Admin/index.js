import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminPage from '../../layouts/AdminPage';
import AdminNav from '../../components/AdminNav';
import AdminStatistics from './AdminStatistics';
import AdminUsers from './AdminUsers';
import AdminSettings from './AdminSettings';
import AdminEvents from './AdminEvents';
import AdminActions from './AdminActions';

@withRouter
@inject('store')
@observer
class Admin extends React.Component {
  render() {
    return (
      <AdminPage>
        <AdminNav 
          pushHistory={(destination) => this.props.history.push(destination)}
        />
        <Switch>
          <Route exact path='/admin'          component={AdminStatistics} />
          <Route exact path='/admin/stats'    component={AdminStatistics} />
          <Route exact path='/admin/users'    component={AdminUsers}      />
          <Route exact path='/admin/settings' component={AdminSettings}   />
          <Route exact path='/admin/events'   component={AdminEvents}     />
          <Route exact path='/admin/actions'  component={AdminActions}    />
        </Switch>
      </AdminPage>
    );
  }
}

export default Admin;
