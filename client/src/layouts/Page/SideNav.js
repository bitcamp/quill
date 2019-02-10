import React from 'react';
import { Link } from "react-router-dom";
import { Icon, Image, Menu } from 'semantic-ui-react';
import bitcampLogo from '../../images/logo.svg';
import './index.css';

const MenuItemLink = (props) => {
  const { to, children } = props;
  return <Menu.Item as={Link} to={to}>{children}</Menu.Item>
}

export default class SideNav extends React.Component {
  render() {
    const { canApply, canConfirm, isAdmin, handleLogout } = this.props;
    const applyLink = canApply
      ? <MenuItemLink to='/apply'><Icon name='clipboard list' />Apply</MenuItemLink>
      : null;
    const confirmLink = canConfirm
      ? <MenuItemLink to='/confirm'><Icon name='check'/>Confirm</MenuItemLink>
      : null;
    const adminLink = isAdmin
      ? <MenuItemLink to="/admin"><Icon name='settings'/>Admin</MenuItemLink>
      : null;

    return (
      <Menu
        icon='labeled'
        inverted
        vertical
        fluid
        attached
        style={{minHeight: '100%'}}
      >
        <Image className="navLogo" src={bitcampLogo} />
        <MenuItemLink to="/">
          <Icon name='home'/>
          Home
        </MenuItemLink>
        {applyLink}
        {confirmLink}
        {adminLink}
        <Menu.Item as='a' onClick={handleLogout}>
          <Icon name='log out'/>
          Log Out
        </Menu.Item>
      </Menu>
    );
  }
}
