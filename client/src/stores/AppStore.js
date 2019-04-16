import { action, observable, computed } from 'mobx';
import * as AuthService from '../services/AuthService';
import * as UserService from '../services/UserService';
import AdminStore from './AdminStore';

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

  @observable loading = false;
  @observable schoolOptions = [];

  @action login = async (email, password, history) => {
    this.loading = true;
    const loginResponse = await AuthService.login(null, email, password);
    this.loading = false;
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
    this.loading = true;
    const loginResponse = await AuthService.login(token, null, null);
    this.loading = false;
    const loginJson = await loginResponse.json();

    if (loginResponse.ok) {
      this.token = loginJson['token'];
      this.user = loginJson['user'];
      AuthService.setTokenInCookies(this.token);
      return true;
    } else {
      this.clearMessages();
      this.messages.push({
        text: loginJson['message'],
        type: 'error',
      });
    }

    return false;
  }

  @action logout = (history) => {
    this.token = null;
    this.user = {};
    AuthService.logout();
    history.push('/login');
  }

  @action signup = async (email, password, history) => {
    this.loading = true;
    const signupResponse = await AuthService.signup(email, password);
    this.loading = false;
    const signupJson = await signupResponse.json();

    if (signupResponse.ok) {
      this.token = signupJson['token'];
      this.user = signupJson['user'];
      AuthService.setTokenInCookies(this.token);
      history.push('/');
    } else {
      this.clearMessages();
      this.messages.push({
        text: signupJson['message'],
        type: 'error',
      });
    }
  }

  @action verify = async (token, history) => {
    this.loading = true;
    const verifyResponse = await AuthService.verify(token);
    this.loading = false;

    if (verifyResponse.ok) {
      if (this.loggedIn) {
        await this.loginWithToken(this.token); // re-login to refresh user object
      }
      return true;
    } else if (verifyResponse.status === 404) {
      this.messages.push({
        text: `An internal error has occurred: ${verifyResponse.status}`,
        type: 'error',
      });
    } else {
      const verifyJson = await verifyResponse.json();
      this.clearMessages();
      this.messages.push({
        text: verifyJson['message'],
        type: 'error',
      });
    }

    return false;
  }

  @action sendPasswordResetEmail = async (email) => {
    this.loading = true;
    const response = await AuthService.sendPasswordResetEmail(email);
    this.loading = false;

    if (response.ok) {
      this.clearMessages();
      this.messages.push({
        text: 'Check your email to reset your password!',
        type: 'success',
      });
      return true;
    } else {
      const responseJson = await response.json();
      this.clearMessages();
      this.messages.push({
        text: responseJson['message'],
        type: 'error',
      });
    }

    return false;
  }

  @action resetPassword = async (tempToken, newPassword, oldPassword, history) => {
    if (newPassword !== oldPassword) {
      this.clearMessages();
      this.messages.push({
        text: 'Passwords do not match!',
        type: 'error',
      });
      return false;
    }

    this.loading = true;
    const response = await AuthService.resetPassword(tempToken, newPassword);
    this.loading = false;

    if (response.ok) {
      this.clearMessages();
      this.messages.push({
        text: 'Your password was reset successfully!',
        type: 'success',
      });
      return true;
    } else {
      const responseJson = await response.json();
      this.clearMessages();
      this.messages.push({
        text: responseJson['message'],
        type: 'error',
      });
    }

    return false;
  };

  @action updateProfile = async (profile) => {
    this.loading = true;
    const response = await UserService.updateProfile(this.token, this.user._id, profile);
    this.loading = false;

    if (response.ok) {
      const responseJson = await response.json();
      this.user = responseJson;
      this.clearMessages();
      this.messages.push({
        text: 'Your profile was updated successfully',
        type: 'success',
      });
      return true;
    } else {
      const responseJson = await response.json();
      this.clearMessages();
      this.messages.push({
        text: responseJson['message'],
        type: 'error',
      });
    }

    return false;
  }

  @action updateConfirmation = async (confirmation) => {
    this.loading = true;
    const response = await UserService.updateConfirmation(this.token, this.user._id, confirmation);
    this.loading = false;

    if (response.ok) {
      const responseJson = await response.json();
      this.user = responseJson;
      this.clearMessages();
      this.messages.push({
        text: 'Your confirmation was updated successfully',
        type: 'success',
      });
      return true;
    } else {
      const responseJson = await response.json();
      this.clearMessages();
      this.messages.push({
        text: responseJson['message'],
        type: 'error',
      });
    }

    return false;
  }

  @action decline = async () => {
    this.loading = true;
    const response = await UserService.decline(this.token, this.user._id);
    this.loading = false;

    if (response.ok) {
      const responseJson = await response.json();
      this.user = responseJson;
      this.clearMessages();
      this.messages.push({
        text: 'You declined attendance',
        type: 'success',
      });
      return true;
    } else {
      const responseJson = await response.json();
      this.clearMessages();
      this.messages.push({
        text: responseJson['message'],
        type: 'error',
      });
    }

    return false;
  }

  @action resendVerificationEmail = async (id) => {
    this.loading = true;
    const response = await AuthService.resendVerificationEmail(this.user._id);
    this.loading = false;

    if (response.ok) {
      this.clearMessages();
      this.messages.push({
        text: 'Your verification email has been resent',
        type: 'success',
      });
      return true;
    } else {
      const responseJson = await response.json();
      this.clearMessages();
      this.messages.push({
        text: responseJson['message'],
        type: 'error',
      });
    }
  }

  constructor () {
    this.adminStore = new AdminStore(this);
  }
}
