import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import App from './containers/App';
import AppStore from './stores/AppStore';
import AdminStore from './stores/AdminStore';
import * as AuthService from './services/AuthService';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

const appStore = new AppStore();
const adminStore = new AdminStore();

const loadSchoolOptions = async () => {
  const response = await fetch('/res/schoolOptions.json');
  const responseJson = await response.json();
  appStore.schoolOptions = responseJson;
}

const renderApp = async () => {
  const existingToken = AuthService.getTokenFromCookies();
  if (existingToken) {
    await appStore.loginWithToken(existingToken);
  }

  ReactDOM.render(
    <Provider 
      store={appStore}
      adminStore={adminStore}
    >
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

loadSchoolOptions();
renderApp();
