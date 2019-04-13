import React from 'react';
import { observer } from 'mobx-react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router';

@withRouter
@observer
class AdminNav extends React.Component {
  render() {
    let activePage = 'stats';
    const splitPath = this.props.location.pathname.split('/', 3);
    if (splitPath.length >= 3) {
      activePage = splitPath[2];
    }

    return (
      <Menu size='huge' fluid attached>
        <Menu.Item name='stats' active={activePage === 'stats'} onClick={() => this.props.pushHistory('/admin/stats')} />
        <Menu.Item name='users' active={activePage === 'users'} onClick={() => this.props.pushHistory('/admin/users')} />
        <Menu.Item name='settings' active={activePage === 'settings'} onClick={() => this.props.pushHistory('/admin/settings')} />
        <Menu.Item name='events' active={activePage === 'events'} onClick={() => this.props.pushHistory('/admin/events')} />
        <Menu.Item name='actions' active={activePage === 'actions'} onClick={() => this.props.pushHistory('/admin/actions')} />
      </Menu>
    )
  }
}

export default AdminNav;