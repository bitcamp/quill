import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Switch, Route } from "react-router-dom";
import AdminPage from '../../layouts/AdminPage';
import AdminNav from '../../components/Admin/AdminNav';
import AdminStats from './AdminStats';
import AdminUsers from './AdminUsers';
import AdminSettings from './AdminSettings';
import AdminEvents from './AdminEvents';
import AdminActions from './AdminActions';

@withRouter
@inject('store')
@observer
class Admin extends React.Component {
  render() {
    const splitPath = this.props.location.pathname.split('/', 3);
    const activePage = splitPath.length >= 3
      ? splitPath[2]
      : 'stats';

    return (
      <AdminPage>
        <AdminNav
          activePage={activePage}
          pushHistory={(destination) => this.props.history.push(destination)}
        />
        <Switch>
          <Route exact path='/admin'          component={AdminStats} />
          <Route exact path='/admin/stats'    component={AdminStats} />
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
