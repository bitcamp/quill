import React from 'react';
import { observer } from 'mobx-react';

@observer
class UsersTable extends React.Component {
  render () {
    return (
      <div>
        {this.props.users.map(user => (
          <div>
            {JSON.stringify(user).substring(0, 50)}
          </div>
        ))}
      </div>
    )
  }
}

export default UsersTable;