import React from 'react';
import Page from '../layouts/Page';
import SettingForm from '../components/SettingsForm';
import {getPublicSettings} from '../services/SettingsService';

class Admin extends React.Component {

  render() {
    return (
      <Page title="God Mode">
         <SettingForm
          settings={getPublicSettings()}/>
      </Page>
    );
  }
}

export default Admin;
