import { action, observable, computed } from 'mobx';
import * as AuthService from '../services/AuthService';

export default class AppStore {
  @observable token = null;
  @observable user = {};
  @computed get loggedIn() {
    return this.token != null;
  }
  @computed get adminLoggedIn() {
    return this.user != null && this.user.admin;
  }

  @observable messages = [];
  @action clearMessages = () => this.messages.length = 0;

  @action login = async (email, password, history) => {
    const loginResponse = await AuthService.login(null, email, password);
    const loginJson = await loginResponse.json();
    if (loginResponse.ok) {
      this.token = loginJson['token'];
      this.user = loginJson['user'];
      AuthService.setTokenInCookies(this.token);
      history.push('/');
    } else {
      this.clearMessages();
      this.messages.push({
        text: loginJson['message'],
        type: 'error',
      });
    }
  }

  @action loginWithToken = async (token) => {
    const loginResponse = await AuthService.login(token, null, null);
    const loginJson = await loginResponse.json();
    if (loginResponse.ok) {
      this.token = loginJson['token'];
      this.user = loginJson['user'];
      AuthService.setTokenInCookies(this.token);
    } else {
      this.clearMessages();
      this.messages.push({
        text: loginJson['message'],
        type: 'error',
      });
    }
  }

  @action logout = (history) => {
    this.token = null;
    this.user = {};
    AuthService.logout();
    history.push('/login');
  }
}
