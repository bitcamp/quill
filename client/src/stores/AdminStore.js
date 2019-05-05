import { action, observable, computed } from 'mobx';
import * as UserService from '../services/UserService'

export default class AdminStore {
  // Statistics
  @observable loadingStats = false;
  @observable stats = { };
  @action loadStats = async () => {
    this.loadingStats = true;

    const statsResponse = await UserService.fetchStats(this.rootStore.token);

    if (statsResponse.ok) {
      const statsJson = await statsResponse.json();
      this.stats = statsJson;
    } else {
      this.rootStore.clearMessages();
      this.rootStore.messages.push({
        type: 'error',
        text: 'failed to load stats',
      });
    }

    this.loadingStats = false;
  }

  // Users
  @observable loadingUsers = false;
  @observable currentPage = 0;
  @observable numPages = 0;
  @observable activeUser = null;
  @observable activeUsers = [];

  @action loadUsers = async (page, pageSize, query) => {
    this.loadingUsers = true;
    const searchResponse = await UserService.fetchUsers(this.rootStore.token, {
      page,
      size: pageSize,
      text: query,
    });

    if (searchResponse.ok) {
      const searchJson = await searchResponse.json();
      this.activeUsers = searchJson.users;
      this.numPages = searchJson.totalPages;
    } else {
      this.rootStore.clearMessages();
      this.rootStore.messages.push({
        type: 'error',
        text: 'failed to load users',
      });
    }

    this.loadingUsers = false;
  }

  @action selectUser = (userId) => {
    if (userId === null) {
      this.activeUser = null;
    } else {
      this.activeUser = this.activeUsers
        .find(user => user.id === userId);
    }
  }

  @action admitUser = async (userId) => {
    this.loadingUsers = true;

    const admitResponse = await UserService.admit(this.rootStore.token, userId);

    if (admitResponse.ok) {
      const admitJson = await admitResponse.json();
      const indexOfUserToUpdate = this.activeUsers
        .map(user => user.id)
        .indexOf(admitJson.id);
      if (indexOfUserToUpdate !== -1) {
        this.activeUsers[indexOfUserToUpdate] = admitJson;
      }
    } else {
      const admitJson = await admitResponse.json();
      this.rootStore.clearMessages();
      this.rootStore.messages.push({
        type: 'error',
        text: admitJson.message,
      });
    }

    this.loadingUsers = false;
  }

  @action checkinUser = async (userId) => {
    this.loadingUsers = true;

    const checkinResponse = await UserService.checkin(this.rootStore.token, userId);

    if (checkinResponse.ok) {
      const checkinJson = await checkinResponse.json();
      const indexOfUserToUpdate = this.activeUsers
        .map(user => user.id)
        .indexOf(checkinJson.id);
      if (indexOfUserToUpdate !== -1) {
        this.activeUsers[indexOfUserToUpdate] = checkinJson;
      }
    } else {
      const checkinJson = await checkinResponse.json();
      this.rootStore.clearMessages();
      this.rootStore.messages.push({
        type: 'error',
        text: checkinJson.message,
      });
    }

    this.loadingUsers = false;
  }

  // Events
  @observable events = [];

  constructor (rootStore) {
    this.rootStore = rootStore;
  }
}
