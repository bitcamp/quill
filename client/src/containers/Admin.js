import React from 'react';
import Page from '../layouts/Page';
import withAuth from '../util/withAuth';

class Admin extends React.Component {
  render() {
    return <Page title="Admin">Admin Here</Page>
  }
}

const isUserAdmin = user => user.admin;
export default withAuth(Admin, isUserAdmin);
