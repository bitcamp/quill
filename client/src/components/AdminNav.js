import React from 'react';
import { observer } from 'mobx-react';
import { Menu } from 'semantic-ui-react';

@observer
class AdminNav extends React.Component {
  render() {
    return (
      <Menu size='huge' fluid attached>
        <Menu.Item name='stats' active={this.props.activePage === 'stats'} onClick={() => this.props.pushHistory('/admin/stats')} />
        <Menu.Item name='users' active={this.props.activePage === 'users'} onClick={() => this.props.pushHistory('/admin/users')} />
        <Menu.Item name='settings' active={this.props.activePage === 'settings'} onClick={() => this.props.pushHistory('/admin/settings')} />
      </Menu>
    )
  }
}

export default AdminNav;