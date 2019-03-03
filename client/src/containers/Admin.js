import React from 'react';
import Page from '../layouts/Page';
import SettingForm from '../components/SettingsForm';

class Admin extends React.Component {
  render() {
    return (
      <Page title="God Mode">
         <SettingForm/>
      </Page>
    );
  }
}

export default Admin;
