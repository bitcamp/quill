import React from 'react';
import { inject, observer } from 'mobx-react';
import UsersTable from '../../components/UsersTable';

@inject('store')
@observer
class AdminUsers extends React.Component {
  constructor (props) {
    super(props);
    props.store.adminStore.searchUsers();
  }

  render() {
    return (
      <span>
        <UsersTable users={this.props.store.adminStore.users} />
      </span>
    )
  }
}

export default AdminUsers;