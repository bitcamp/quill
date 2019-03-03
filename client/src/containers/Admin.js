import React from 'react';
import Page from '../layouts/Page';
import AdminForm from '../components/AdminForm';

class Admin extends React.Component {
  render() {
    return (
      <Page title="God Mode">
         <AdminForm/>
      </Page>
    );
  }
}

export default Admin;
