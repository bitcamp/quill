import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Image, Menu, Icon } from 'semantic-ui-react';

const MenuItemLink = (props) => {
  const { to, children } = props;
  return <Menu.Item as={Link} to={to}>{children}</Menu.Item>
}

export default (props) => {
  const { canApply, canConfirm, isAdmin, handleLogout } = props;
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
      fluid
      attached
    >
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