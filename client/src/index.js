import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import App from './containers/App';
import AppStore from './stores/AppStore';
import * as AuthService from './services/AuthService';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

const appStore = new AppStore();

const renderApp = async () => {
  const existingToken = AuthService.getTokenFromCookies();
  if (existingToken) {
    await appStore.loginWithToken(existingToken);
  }

  ReactDOM.render(
    <Provider store={appStore}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

renderApp();
